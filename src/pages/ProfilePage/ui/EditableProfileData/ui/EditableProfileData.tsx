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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { YupInput } from 'widgets/YupInput';
import { ProfileUpdateSchema } from '../types/ValidationSchema';
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

    const {
        register, watch, setValue, formState: { errors }, handleSubmit,
    } = useForm({ resolver: yupResolver(ProfileUpdateSchema) });

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isPasswordInFocus, setIsPasswordInFocus] = useState<boolean>(false);
    const [changeProfileResult, setChangeProfileResult] = useState<string>('');
    const [changePasswordResult, setChangePasswordResult] = useState<string>('');

    const handleChangesCancel = useCallback(() => {
        setIsPasswordInFocus(false);
        setIsEditable(false);

        setValue('firstname', user?.firstname);
        setValue('lastname', user?.lastname);
        setValue('oldPassword', 'пасхалка');
        setValue('newPassword', '');
        setValue('repeatedPassword', '');
    }, [setValue, user?.firstname, user?.lastname]);

    const onSubmit = handleSubmit(async (data) => {
        setChangeProfileResult('');
        setChangePasswordResult('');
        if (watch('newPassword')) {
            if (watch('newPassword') !== watch('repeatedPassword')) {
                alert(t('Новые пароли не совпадают') as string);
            }

            const result = await dispatch(checkPassword(watch('oldPassword') || ''));
            if (result.meta.requestStatus === 'fulfilled') {
                const subResult = await dispatch(changeUserPassword(watch('newPassword') || ''));

                if (subResult.meta.requestStatus === 'fulfilled') {
                    setChangePasswordResult('Пароль успешно изменен');
                }
            }
        }

        if (watch('firstname') !== user?.firstname
            || watch('lastname') !== user?.lastname) {
            const subResult = await dispatch(changeUserProfile({
                firstname: watch('firstname') || '',
                lastname: watch('lastname') || '',
            }));

            if (subResult.meta.requestStatus === 'fulfilled') {
                setChangeProfileResult('Профиль успешно изменен');
            }
        }

        handleChangesCancel();
    });

    return (
        <Card
            className={classNames(classes.EditableProfileData, {}, [className])}
        >
            <form onSubmit={onSubmit}>
                <VStack
                    className={classes.wrapper}
                    align="start"
                    justify="start"
                >
                    <h3 className={classes.title}>{t('Личные данные')}</h3>
                    <YupInput
                        className={classes.yupInput}
                        customValue={user?.firstname || ''}
                        register={register}
                        name="firstname"
                        watch={watch}
                        setValue={setValue}
                        // @ts-ignore
                        errors={errors}
                        placeholder={t('Имя') as string}
                        disabled={!isEditable}
                    />
                    <YupInput
                        className={classes.yupInput}
                        customValue={user?.lastname || ''}
                        register={register}
                        name="lastname"
                        watch={watch}
                        setValue={setValue}
                        // @ts-ignore
                        errors={errors}
                        placeholder={t('Фамилия') as string}
                        disabled={!isEditable}
                    />
                    <Input
                        placeholder={t('Почта') as string}
                        value={user?.email}
                        plain
                    />
                    <Input
                        placeholder={t('Номер телефона') as string}
                        value={user?.phoneNumber}
                        plain
                    />
                    {isEditable && (
                        <p className={classes.passwordSupport}>
                            {t('Нажмите, чтобы сменить пароль')}
                        </p>
                    )}
                    <YupInput
                        className={classes.yupInput}
                        inputType="password"
                        customValue={isEditable ? '5' : 'пасхалка'}
                        register={register}
                        name="oldPassword"
                        watch={watch}
                        setValue={setValue}
                        // @ts-ignore
                        errors={errors}
                        placeholder={t('Введите старый пароль') as string}
                        disabled={!isEditable}
                        onFocus={() => {
                            setValue('oldPassword', '');
                            setIsPasswordInFocus(true);
                        }}
                    />
                    {isPasswordInFocus && (
                        <>
                            <YupInput
                                className={classes.yupInput}
                                inputType="password"
                                register={register}
                                name="newPassword"
                                watch={watch}
                                setValue={setValue}
                                // @ts-ignore
                                errors={errors}
                                placeholder={t('Введите новый пароль') as string}
                                disabled={!isEditable}
                            />
                            <YupInput
                                className={classes.yupInput}
                                inputType="password"
                                register={register}
                                name="repeatedPassword"
                                watch={watch}
                                setValue={setValue}
                                // @ts-ignore
                                errors={errors}
                                placeholder={t('Повторите новый пароль') as string}
                                disabled={!isEditable}
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
                                // onClick={handleSubmitChanges}
                                disabled={userIsLoading}
                                type="submit"
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
            </form>
        </Card>
    );
});
