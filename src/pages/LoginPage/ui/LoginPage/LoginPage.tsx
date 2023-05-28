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
import { YupInput } from 'widgets/YupInput';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { loginByYandexAuth } from 'pages/LoginPage';
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

    const { t } = useTranslation('LoginPage');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const loginError = useSelector(getLoginDataError);
    const loginIsLoading = useSelector(getLoginDataIsLoading);

    const [isEmailRequired, setIsEmailRequired] = useState<boolean>(false);
    const [isPhoneRequired, setIsPhoneRequired] = useState<boolean>(false);

    const SignupSchema = Yup.object({
        email: isEmailRequired
            ? Yup.string()
                .email(t('invalid_email') as string)
                .required(t('required_field') as string)
            : Yup.string(),

        phoneNumber: isPhoneRequired
            ? Yup.string()
                .matches(/^\d{11}$/, t('invalid_number') as string)
                .required(t('required_field') as string)
            : Yup.string(),

        password: Yup.string()
            .max(15, t('too_long') as string)
            .required(t('required_field') as string),
    }).required();

    const {
        register, handleSubmit, setValue, watch, formState: { errors },
    } = useForm({
        resolver: yupResolver(SignupSchema),
    });

    const email = watch('email');
    const phoneNumber = watch('phoneNumber');

    const onSubmit = handleSubmit(async (data) => {
        const loginResult = await dispatch(login(data));

        if (loginResult.meta.requestStatus === 'fulfilled') {
            navigate('/feed');
        }
    });

    useEffect(() => {
        const yandexLogin = async () => {
            const code = Number(params.get('code'));
            if (code) {
                navigate('/login');
                const result = await dispatch(loginByYandexAuth(code));

                if (result.meta.requestStatus === 'fulfilled') {
                    alert('успешный вход');
                    navigate('/feed');
                } else {
                    alert('ошибка');
                }
            }
        };

        yandexLogin();
    }, [params, navigate, dispatch]);

    useEffect(() => {
        document.title = 'ПРОЩЕ | Вход';

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
            title: t('По почте'),
            content: (
                <YupInput
                    // @ts-ignore
                    errors={errors}
                    register={register}
                    placeholder="Email"
                    name="email"
                    watch={watch}
                    setValue={setValue}
                />
            ),
        },
        {
            title: t('По номеру телефона'),
            content: (
                <YupInput
                    // @ts-ignore
                    errors={errors}
                    register={register}
                    placeholder={t('Номер телефона') as string}
                    name="phoneNumber"
                    watch={watch}
                    setValue={setValue}
                />
            ),
        },
    ], [errors, register, setValue, t, watch]);

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
                        {t('вход')}
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
                            placeholder={t('Пароль') as string}
                            className={classNames(classes.input, {
                                [classes.error]: !!errors.password,
                            })}
                            type="password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <span
                                className={classes.errorMessage}
                            >
                                {`${errors.password.message}`}
                            </span>
                        )}

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
                            to={RoutePath.reset_password}
                        >
                            {t('Забыли пароль?')}
                        </AppLink>
                        <AppLink
                            className={classes.link}
                            to={RoutePath.register}
                        >
                            {t('Не регистрировались ранее?')}
                        </AppLink>
                    </HStack>

                    <HStack
                        className={classes.signInHelpersWrapper}
                        max
                        justify="center"
                        align="center"
                    >
                        <span className={classes.smallMainHeader}>{t('ПРОЩЕ')}</span>
                        <span className={classes.signInHelpers}>{t('войти через')}</span>
                        <Button
                            style={{ marginRight: 30 }}
                            variant="clear"
                            onClick={() => navigate(
                                '//oauth.yandex.ru/authorize?response_type=code&client_id=c1688919452843349161a0207d2ac149',
                            )}
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
                        <span className={classes.signInHelpers}>{t('или')}</span>
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
