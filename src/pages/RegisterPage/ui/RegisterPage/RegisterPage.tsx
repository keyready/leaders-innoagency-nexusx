import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useState } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Icon } from 'shared/UI/Icon/Icon';
import YandexIcon from 'shared/assets/icons/yandex-signin-logo.svg';
import GoogleIcon from 'shared/assets/icons/google-signin-logo.svg';
import { useNavigate } from 'react-router';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { StepOneForm } from '../StepOneForm/StepOneForm';
import { StepFourForm } from '../StepFourForm/StepFourForm';
import { StepThreeForm } from '../StepThreeForm/StepThreeForm';
import { StepTwoForm } from '../StepTwoForm/StepTwoForm';
import { getRegisterError, getRegisterIsLoading } from '../../model/selectors/getRegisterData';
import { RegisterPageReducer } from '../../model/slices/RegisterPageSlice';
import classes from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string;
}

const reducers: ReducersList = {
    registerPage: RegisterPageReducer,
};

type FormValues = {
    email: string;
    password: string;
};

const RegisterPage = memo((props: RegisterPageProps) => {
    const { className } = props;

    const { t } = useTranslation('RegisterPage');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerIsLoading = useSelector(getRegisterIsLoading);
    const registerError = useSelector(getRegisterError);

    const [currentStep, setCurrentStep] = useState<number>(1);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    // const onSubmit = handleSubmit((data) => {
    //     dispatch(login(data));
    // });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.RegisterPage, {}, [className])}>
                <VStack gap="20" justify="start" align="center">
                    <h1 className={classes.mainHeader}>
                        {t('регистрация')}
                    </h1>
                    <p className={classes.subtitle}>
                        Займет не более
                        {' '}
                        <b>5 минут</b>
                        {',\n '}
                        а в будущем сэкономит часы!
                    </p>
                </VStack>

                {currentStep === 1 && (
                    <StepOneForm onSubmit={
                        () => setCurrentStep((prevState) => prevState + 1)
                    }
                    />
                )}
                {currentStep === 2 && (
                    <StepTwoForm onSubmit={
                        () => {
                            setCurrentStep((prevState) => prevState + 1);
                        }
                    }
                    />
                )}
                {currentStep === 3 && (
                    <StepThreeForm />
                )}
                {currentStep === 4 && (
                    <StepFourForm />
                )}

                <VStack className={classes.formWrapper} gap="4" justify="start" align="center">
                    <Button
                        style={{ marginTop: 20 }}
                        variant="primary"
                        onClick={() => setCurrentStep((prevState) => prevState + 1)}
                        type="button"
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
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default RegisterPage;
