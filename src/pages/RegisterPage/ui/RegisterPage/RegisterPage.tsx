import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import {
    DynamicModuleLoader, ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/UI/Stack';
import { Alert } from 'shared/UI/Alert';
import { Button } from 'shared/UI/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from 'pages/LoginPage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Icon } from 'shared/UI/Icon/Icon';
import YandexIcon from 'shared/assets/icons/yandex-signin-logo.svg';
import GoogleIcon from 'shared/assets/icons/google-signin-logo.svg';
import { useNavigate } from 'react-router';
import classes from './RegisterPage.module.scss';
import { RegisterPageReducer } from '../../model/slices/RegisterPageSlice';

import {
    getRegisterError, getRegisterIsLoading,
} from '../../model/selectors/getRegisterData';

interface RegisterPageProps {
    className?: string;
}

const reducers: ReducersList = {
    registerPage: RegisterPageReducer,
};

const RegisterPage = memo((props: RegisterPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const registerIsLoading = useSelector(getRegisterIsLoading);
    const registerError = useSelector(getRegisterError);

    const SignupSchema = Yup.object({
        email: Yup.string()
            .email('Неправильно введена почта')
            .required('Обязательное поле'),

        phoneNumber: Yup.string()
            .matches(/^\d{11}$/, 'Неправильно введен номер телефона')
            .required('Обязательное поле'),

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

    const onSubmit = handleSubmit((data) => {
        dispatch(login(data));
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.RegisterPage, {}, [className])}>
                <VStack gap="20" justify="start" align="center">
                    <h1 className={classes.mainHeader}>
                        регистрация
                    </h1>
                    <p className={classes.subtitle}>
                        Займет не более
                        {' '}
                        <b>5 минут</b>
                        {',\n '}
                        а в будущем сэкономит часы!
                    </p>
                </VStack>
                <VStack className={classes.formWrapper} gap="4" justify="start" align="center">
                    <form
                        onSubmit={onSubmit}
                        className={classes.Form}
                    >
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
                                {`* ${errors.email.message}`}
                            </span>
                        )}

                        <p className={classes.orWrapper}>или</p>

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
                                {`* ${errors.phoneNumber.message}`}
                            </span>
                        )}

                        {registerError && (
                            <Alert
                                className={classes.alert}
                                variant="danger"
                            >
                                {registerError}
                            </Alert>
                        )}

                        <p className={classes.sendWrapper}>
                            На него мы отправим код
                            <b>{' подтверждения'}</b>
                            .
                        </p>

                        <Button
                            style={{ marginTop: 20 }}
                            variant="primary"
                            type="submit"
                        >
                            Следующий шаг
                        </Button>

                        <HStack max justify="center">
                            <AppLink
                                className={classes.link}
                                to={RoutePath.login}
                            >
                                Уже есть аккаунт?
                            </AppLink>
                        </HStack>

                        <HStack
                            className={classes.signInHelpersWrapper}
                            max
                            justify="center"
                            align="center"
                        >
                            <span className={classes.smallMainHeader}>ПРОЩЕ</span>
                            <span className={classes.signInHelpers}>зарегистрироваться через:</span>
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
                    </form>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default RegisterPage;
