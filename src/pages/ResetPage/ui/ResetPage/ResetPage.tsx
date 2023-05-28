import { classNames } from 'shared/lib/classNames/classNames';
import {
    FormEvent, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { useSelector } from 'react-redux';
import { Alert } from 'shared/UI/Alert';
import { resetPassword } from '../../model/services/resetPassword';
import { getResetPasswordError, getResetPasswordIsLoading } from '../../model/selectors/getResetPasswordStatus';
import classes from './ResetPage.module.scss';

interface ResetPageProps {
    className?: string;
}

const ResetPage = memo((props: ResetPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getResetPasswordIsLoading);
    const error = useSelector(getResetPasswordError);

    const [userData, setUserData] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const resetPasswordHandler = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = await dispatch(resetPassword(userData));
        if (result.meta.requestStatus === 'fulfilled') {
            setSuccessMessage(t('Вам на почту отправлен временный пароль!') as string);
        }
    }, [dispatch, t, userData]);

    return (
        <Page className={classNames(classes.ResetPage, {}, [className])}>
            <h2 style={{ textAlign: 'center' }}>{t('Сброс пароля')}</h2>
            <HStack max align="center" justify="center">
                <form onSubmit={resetPasswordHandler} className={classes.form}>
                    <VStack max justify="center" align="stretch">
                        <Input
                            placeholder={t('Введите почту или телефон, на который зарегистрирован аккаунт') as string}
                            value={userData}
                            onChange={setUserData}
                        />
                        <Button
                            className={classes.btn}
                            disabled={isLoading || !userData}
                            variant="primary-outline"
                            type="submit"
                        >
                            {t('Сбросить пароль')}
                        </Button>

                        {successMessage && (
                            <Alert variant="success">
                                {successMessage}
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        )}
                    </VStack>
                </form>
            </HStack>
        </Page>
    );
});

export default ResetPage;
