import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Input } from 'shared/UI/Input';
import { useSelector } from 'react-redux';
import {
    getUserAuthData,
    getUserCheckOldPasswordError,
    getUserIsLoading,
    checkPassword,
    changeUserPassword, getUserError,
    changeUserProfile,
} from 'entities/User';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Alert } from 'shared/UI/Alert';
import classes from './EditableProfileData.module.scss';

interface EditableProfileDataProps {
    className?: string;
}

interface EditableUser {
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    oldPassword?: string;
    newPassword?: string;
    repeatedPassword?: string;
}

export const EditableProfileData = memo((props: EditableProfileDataProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('ProfilePage');
    const dispatch = useAppDispatch();

    const user = useSelector(getUserAuthData);
    const checkPasswordError = useSelector(getUserCheckOldPasswordError);
    const userIsLoading = useSelector(getUserIsLoading);
    const userError = useSelector(getUserError);

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isPasswordInFocus, setIsPasswordInFocus] = useState<boolean>(false);
    const [changeProfileResult, setChangeProfileResult] = useState<string>('');
    const [changePasswordResult, setChangePasswordResult] = useState<string>('');
    const [editableForm, setEditableForm] = useState<EditableUser>({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        oldPassword: '',
        newPassword: '',
        repeatedPassword: '',
    });

    const handleChangesCancel = useCallback(() => {
        setIsPasswordInFocus(false);
        setIsEditable(false);
        setEditableForm({
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            oldPassword: '',
            newPassword: '',
            repeatedPassword: '',
        });
    }, [user?.email, user?.firstname, user?.lastname, user?.phoneNumber]);
    const handleSubmitChanges = useCallback(async () => {
        if (editableForm.newPassword) {
            if (editableForm.newPassword !== editableForm.repeatedPassword) {
                alert(t('Новые пароли не совпадают') as string);
            }

            const result = await dispatch(checkPassword(editableForm.oldPassword || ''));
            if (result.meta.requestStatus === 'fulfilled') {
                const subResult = await dispatch(changeUserPassword(editableForm.newPassword || ''));

                if (subResult.meta.requestStatus === 'fulfilled') {
                    setChangePasswordResult('Пароль успешно изменен');
                }
            }
        }

        if (editableForm.firstname !== user?.firstname
            || editableForm.lastname !== user?.lastname) {
            const subResult = await dispatch(changeUserProfile({
                firstname: editableForm.firstname || '',
                lastname: editableForm.lastname || '',
            }));

            if (subResult.meta.requestStatus === 'fulfilled') {
                setChangeProfileResult('Профиль успешно изменен');
            }
        }

        handleChangesCancel();
    }, [dispatch,
        editableForm.firstname,
        editableForm.lastname,
        editableForm.newPassword,
        editableForm.oldPassword,
        editableForm.repeatedPassword,
        user?.firstname,
        user?.lastname,
        handleChangesCancel,
        t]);

    return (
        <Card
            className={classNames(classes.EditableProfileData, {}, [className])}
        >
            <VStack
                className={classes.wrapper}
                align="start"
                justify="start"
            >
                <h2 className={classes.title}>{t('Личные данные')}</h2>
                <Input
                    placeholder={t('Имя') as string}
                    plain={!isEditable}
                    value={editableForm?.firstname}
                    onChange={(value) => {
                        setEditableForm({
                            ...editableForm,
                            firstname: value,
                        });
                    }}
                />
                <Input
                    placeholder={t('Фамилия') as string}
                    value={editableForm?.lastname}
                    onChange={(value) => {
                        setEditableForm({
                            ...editableForm,
                            lastname: value,
                        });
                    }}
                    plain={!isEditable}
                />
                <Input
                    placeholder={t('Почта') as string}
                    value={editableForm?.email}
                    plain
                />
                <Input
                    placeholder={t('Номер телефона') as string}
                    value={editableForm?.phoneNumber}
                    plain
                />
                {isEditable && (
                    <p className={classes.passwordSupport}>
                        {t('Нажмите, чтобы сменить пароль')}
                    </p>
                )}
                <Input
                    placeholder={t('Введите старый пароль') as string}
                    plain={!isEditable}
                    onChange={(value) => {
                        setEditableForm({
                            ...editableForm,
                            oldPassword: value,
                        });
                    }}
                    type="password"
                    value={!isPasswordInFocus ? 'это крутая пасхалка' : editableForm?.oldPassword}
                    onFocus={() => setIsPasswordInFocus(true)}
                />
                {isPasswordInFocus && (
                    <>
                        <Input
                            placeholder={t('Введите новый пароль') as string}
                            value={editableForm.newPassword}
                            onChange={(value) => {
                                setEditableForm({
                                    ...editableForm,
                                    newPassword: value,
                                });
                            }}
                            plain={!isEditable}
                            type="password"
                        />
                        <Input
                            placeholder={t('Повторите новый пароль') as string}
                            value={editableForm.repeatedPassword}
                            onChange={(value) => {
                                setEditableForm({
                                    ...editableForm,
                                    repeatedPassword: value,
                                });
                            }}
                            plain={!isEditable}
                            type="password"
                        />
                    </>
                )}

                {checkPasswordError && (
                    <Alert variant="danger">
                        {checkPasswordError}
                    </Alert>
                )}
                {userError && (
                    <Alert variant="danger">
                        {userError}
                    </Alert>
                )}
                {changeProfileResult && (
                    <Alert variant="success">
                        {changeProfileResult}
                    </Alert>
                )}
                {changePasswordResult && (
                    <Alert variant="success">
                        {changePasswordResult}
                    </Alert>
                )}

                {!isEditable && (
                    <Button
                        className={classes.editButton}
                        onClick={() => setIsEditable(true)}
                        disabled={isEditable}
                    >
                        {t('Редактировать')}
                    </Button>
                )}
                {isEditable && (
                    <HStack max justify="center" align="center" gap="32">
                        <Button
                            onClick={handleSubmitChanges}
                            disabled={userIsLoading}
                        >
                            {userIsLoading
                                ? t('Подождите')
                                : t('Сохранить')}
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleChangesCancel}
                        >
                            {t('Отменить')}
                        </Button>
                    </HStack>
                )}
            </VStack>
        </Card>
    );
});
