import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { useForm } from 'react-hook-form';
import { Button } from 'shared/UI/Button';
import * as Yup from 'yup';
import { HStack, VStack } from 'shared/UI/Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from 'shared/UI/AppLink';
import YandexIcon from 'shared/assets/icons/yandex-signin-logo.svg';
import GoogleIcon from 'shared/assets/icons/google-signin-logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Alert } from 'shared/UI/Alert';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { TabContent, Tabs } from 'shared/UI/Tabs';
import { Input } from 'shared/UI/Input';
import { getLoginDataError, getLoginDataIsLoading } from '../../model/selectors/getLoginData';
import { login } from '../../model/services/Login';
import { LoginPageReducer } from '../../model/slices/LoginPageSlice';
import classes from './LoginPage.module.scss';

interface LoginPageProps {
    className?: string;
}

const reducers: ReducersList = {
    loginPage: LoginPageReducer,
};

const LoginPage = memo((props: LoginPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginError = useSelector(getLoginDataError);
    const loginIsLoading = useSelector(getLoginDataIsLoading);

    const [isEmailRequired, setIsEmailRequired] = useState<boolean>(false);
    const [isPhoneRequired, setIsPhoneRequired] = useState<boolean>(false);

    const SignupSchema = Yup.object({
        email: isEmailRequired
            ? Yup.string()
                .email('Неправильно введена почта')
                .required('Обязательное поле')
            : Yup.string(),

        phoneNumber: isPhoneRequired
            ? Yup.string()
                .matches(/^\d{11}$/, 'Неправильно введен номер телефона')
                .required('Обязательное поле')
            : Yup.string(),

        password: Yup.string()
            .required('Обязательное поле')
            .min(4, 'Слишком короткий')
            .max(15, 'Слишком длинный')
            .matches(/[!@#$%^&*(),.?:{}|<>]/, 'Пароль должен содержать специальные символы'),
    }).required();

    const {
        register, handleSubmit, setValue, watch, formState: { errors },
    } = useForm({
        resolver: yupResolver(SignupSchema),
    });

    const email = watch('email');
    const phoneNumber = watch('phoneNumber');
    const password = watch('password');

    const onSubmit = handleSubmit((data) => {
        dispatch(login(data));
    });

    useEffect(() => {
        if (email && email.length >= 0) {
            setIsEmailRequired(true);
            setValue('phoneNumber', '');
        } else setIsEmailRequired(false);
        if (phoneNumber && phoneNumber.length >= 0) {
            setIsPhoneRequired(true);
            setValue('email', '');
        } else setIsPhoneRequired(false);
    }, [email, phoneNumber, setValue]);

    const inputs: TabContent[] = useMemo(() => [
        {
            title: 'По почте',
            content: (
                <VStack max align="start" justify="center">
                    <input
                        placeholder="Email"
                        className={classNames(classes.input, {
                            [classes.error]: !!errors.email,
                        })}
                        {...register('email')}
                    />
                    {errors.email && (
                        <span
                            className={classes.errorMessage}
                        >
                            {`${errors.email.message}`}
                        </span>
                    )}
                </VStack>
            ),
        },
        {
            title: 'По номеру телефона',
            content: (
                <VStack max align="start" justify="center">
                    <input
                        placeholder="Номер телефона"
                        className={classNames(classes.input, {
                            [classes.error]: !!errors.phoneNumber,
                        })}
                        {...register('phoneNumber')}
                        id="phoneNumber"
                    />
                    {errors.phoneNumber && (
                        <span
                            className={classes.errorMessage}
                        >
                            {`${errors.phoneNumber.message}`}
                        </span>
                    )}
                </VStack>
            ),
        },
    ], [errors, register]);

    const clearInputsOnChangeTabs = useCallback(() => {
        setValue('password', '');
        setValue('phoneNumber', '');
        setValue('email', '');
    }, [setValue]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.LoginPage, {}, [className])}>
                <VStack gap="20" justify="start" align="center">
                    <h1 className={classes.mainHeader}>
                        вход
                    </h1>
                    <p className={classes.subtitle}>
                        Чтобы войти в аккаунт, достаточно
                        {'\n'}
                        ввести что-то одно:
                        {' '}
                        <b>почту</b>
                        {' '}
                        или
                        {' '}
                        <b>номер</b>
                    </p>
                </VStack>

                <VStack
                    className={classes.TabsWrapper}
                    gap="20"
                    justify="start"
                    align="center"
                >
                    <form
                        onSubmit={onSubmit}
                        className={classes.Form}
                    >
                        <Tabs content={inputs} onChangeTrigger={clearInputsOnChangeTabs} />
                        <input
                            placeholder="Пароль"
                            className={classNames(classes.input, {
                                [classes.error]: !!errors.password,
                            })}
                            type="password"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        {errors.password && (
                            <span
                                className={classes.errorMessage}
                            >
                                {`${errors.password.message}`}
                            </span>
                        )}

                        <Input
                            // @ts-ignore
                            errors={errors}
                            register={register}
                            name="email"
                        />

                        {loginError && (
                            <Alert
                                className={classes.alert}
                                variant="danger"
                            >
                                {loginError}
                            </Alert>
                        )}

                        <Button
                            style={{ marginTop: 20 }}
                            variant="primary"
                            type="submit"
                            disabled={loginIsLoading}
                        >
                            {loginIsLoading ? 'Подождите...' : 'Войти'}
                        </Button>
                    </form>

                    {/* доп экшены */}
                    <HStack max justify="center">
                        <AppLink
                            className={classes.link}
                            to="/reset"
                        >
                            Забыли пароль?
                        </AppLink>
                        <AppLink
                            className={classes.link}
                            to={RoutePath.register}
                        >
                            Не регистрировались ранее?
                        </AppLink>
                    </HStack>

                    <HStack
                        className={classes.signInHelpersWrapper}
                        max
                        justify="center"
                        align="center"
                    >
                        <span className={classes.smallMainHeader}>ПРОЩЕ</span>
                        <span className={classes.signInHelpers}>войти через:</span>
                        <Button
                            style={{ marginRight: 30 }}
                            variant="clear"
                            onClick={() => navigate('/yandex-login-link')}
                        >
                            <HStack
                                max
                                align="center"
                                justify="center"
                            >
                                <Icon Svg={YandexIcon} className={classes.loginIcon} />
                                <b style={{ fontSize: 16 }}>Яндекс ID</b>
                            </HStack>
                        </Button>
                        <span className={classes.signInHelpers}>или</span>
                        <Button
                            variant="clear"
                            onClick={() => navigate('/google-login-link')}
                        >
                            <Icon Svg={GoogleIcon} className={classes.loginIcon} />
                        </Button>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default LoginPage;
