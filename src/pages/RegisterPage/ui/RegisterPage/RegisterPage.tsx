import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Icon } from 'shared/UI/Icon/Icon';
import YandexIcon from 'shared/assets/icons/yandex-signin-logo.svg';
import GoogleIcon from 'shared/assets/icons/google-signin-logo.svg';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Alert } from 'shared/UI/Alert';
import { FieldValues } from 'react-hook-form';
import { Card } from 'shared/UI/Card/Card';
import { register } from '../../model/services/Register';
import { StepFifthForm } from '../StepFifthForm/StepFifthForm';
import { StepOneForm } from '../StepOneForm/StepOneForm';
import { StepFourForm } from '../StepFourForm/StepFourForm';
import { StepThreeForm } from '../StepThreeForm/StepThreeForm';
import { StepTwoForm } from '../StepTwoForm/StepTwoForm';
import {
    getRegisterDataAvailable,
    getRegisterError,
    getRegisterIsLoading,
} from '../../model/selectors/getRegisterData';
import { RegisterPageReducer } from '../../model/slices/RegisterPageSlice';
import classes from './RegisterPage.module.scss';
import { checkEmail } from '../../model/services/CheckEmail';

interface RegisterPageProps {
    className?: string;
}

const reducers: ReducersList = {
    registerPage: RegisterPageReducer,
};

type IRegisterForm = {
    email?: string;
    phoneNumber?: string;
    password?: string;
    dateOfBirth?: Date;
    name?: string;
    lastname?: string
};

const RegisterPage = memo((props: RegisterPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'ПРОЩЕ | Регистрация';
    }, []);

    const { t } = useTranslation('RegisterPage');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerIsLoading = useSelector(getRegisterIsLoading);
    const registerError = useSelector(getRegisterError);
    const dataAvailable = useSelector(getRegisterDataAvailable);

    const [registerForm, setRegisterForm] = useState<IRegisterForm>({});

    const [currentStep, setCurrentStep] = useState<number>(1);

    const checkRegisterData = useCallback(async (data: FieldValues) => {
        const result = await dispatch(checkEmail({
            email: data.email
                ? data.email
                : '',
            phoneNumber: data.phoneNumber
                ? data.phoneNumber
                : '',
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            if (currentStep === 1) {
                setRegisterForm({
                    ...registerForm,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                });
            } else {
                setRegisterForm({
                    ...registerForm,
                    dateOfBirth: data.dateOfBirth,
                    email: data.email
                        ? data.email
                        : registerForm.email,
                    phoneNumber: data.phoneNumber
                        ? data.phoneNumber
                        : registerForm.phoneNumber,
                });
            }

            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, dispatch, registerForm]);

    const onSubmit = useCallback(async () => {
        const result = await dispatch(register(registerForm));

        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/');
        }
    }, [dispatch, navigate, registerForm]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.RegisterPage, {}, [className])}>
                {/* {currentStep !== 1 && ( */}
                {/*    <Card className={classes.infoCard}> */}
                {/*        <p style={{ textAlign: 'center' }}>{t('Введенные данные')}</p> */}
                {/*        <VStack justify="start" align="center"> */}
                {/*            {Object.keys(registerForm).map((key) => { */}
                {/*                const val = registerForm[key as keyof IRegisterForm]; */}
                {/*                return ( */}
                {/*                    <p> */}
                {/*                        {val?.toString() !== '' && `${t(key)}: ${val?.toString()}`} */}
                {/*                    </p> */}
                {/*                ); */}
                {/*            })} */}
                {/*        </VStack> */}
                {/*    </Card> */}
                {/* )} */}

                <VStack gap="20" justify="start" align="center">
                    <h1 className={classes.mainHeader}>
                        {t('регистрация')}
                    </h1>
                </VStack>

                <VStack
                    className={classes.formWrapper}
                    gap="4"
                    justify="start"
                    align="center"
                >
                    {currentStep === 1 && (
                        <>
                            <StepOneForm
                                isLoading={registerIsLoading}
                                onSubmitStep={checkRegisterData}
                            />
                            { dataAvailable && (
                                <Alert variant="danger">
                                    {dataAvailable}
                                </Alert>
                            )}
                        </>
                    )}
                    {currentStep === 2 && (
                        <StepTwoForm
                            isLoading={registerIsLoading}
                            onSubmit={
                                () => {
                                    setCurrentStep(currentStep + 1);
                                }
                            }
                        />
                    )}
                    {currentStep === 3 && (
                        <StepThreeForm
                            onSubmitStep={
                                (data) => {
                                    setCurrentStep(currentStep + 1);
                                    setRegisterForm({
                                        ...registerForm,
                                        password: data.password,
                                    });
                                }
                            }
                        />
                    )}
                    {currentStep === 4 && (
                        <StepFourForm
                            isLoading={registerIsLoading}
                            onSubmitStep={
                                (data) => {
                                    setCurrentStep(currentStep + 1);
                                    setRegisterForm({
                                        ...registerForm,
                                        name: data.name,
                                        lastname: data.lastname,
                                    });
                                }
                            }
                        />
                    )}
                    {currentStep === 5 && (
                        <>
                            <StepFifthForm
                                email={registerForm.email}
                                phoneNumber={registerForm.phoneNumber}
                                onSubmitStep={checkRegisterData}
                                isLoading={registerIsLoading}
                            />
                            { dataAvailable && (
                                <Alert variant="danger">
                                    {dataAvailable}
                                </Alert>
                            )}
                        </>
                    )}

                    {currentStep > 5 && (
                        <VStack justify="start" align="center">
                            <h2 className={classes.congratsHeader}>
                                {t('Отлично')}
                            </h2>
                            <p className={classes.congratsText}>
                                {t('congrats')}
                            </p>
                            <Button
                                className={classes.submitButton}
                                variant="primary"
                                type="button"
                                onClick={onSubmit}
                                disabled={registerIsLoading}
                            >
                                {registerIsLoading ? 'Подождите...' : 'На главную!'}
                            </Button>

                            {registerError && (
                                <Alert variant="danger">
                                    {registerError}
                                </Alert>
                            )}
                        </VStack>
                    )}

                    {currentStep === 1 && (
                        <HStack max justify="center">
                            <AppLink
                                className={classes.link}
                                to={RoutePath.login}
                            >
                                {t('Уже есть аккаунт?')}
                            </AppLink>
                        </HStack>
                    )}

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
