import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import {
    changeUserPassword, checkPassword, getUserCheckOldPasswordError, User,
} from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { YupInput } from 'widgets/YupInput';
import { Alert } from 'shared/UI/Alert';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { PasswordUpdateSchema } from '../../EditableProfileData/types/ValidationSchema';
import classes from './PasswordChange.module.scss';

export const PasswordChange = memo(() => {
    const { t } = useTranslation('ProfilePage');
    const dispatch = useAppDispatch();

    const checkPasswordError = useSelector(getUserCheckOldPasswordError);

    const {
        register, watch, setValue, formState: { errors }, handleSubmit,
    } = useForm({ resolver: yupResolver(PasswordUpdateSchema) });

    const [changePasswordResult, setChangePasswordResult] = useState<string>('');
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const handleChangesCancel = useCallback(() => {
        setIsEditable(false);

        setValue('oldPassword', 'пасхалка');
        setValue('newPassword', '');
        setValue('repeatedPassword', '');
    }, [setValue]);

    const onSubmit = handleSubmit(async (data) => {
        setChangePasswordResult('');

        const result = await dispatch(checkPassword(data.oldPassword || ''));
        if (result.meta.requestStatus === 'fulfilled') {
            const subResult = await dispatch(changeUserPassword(data.newPassword || ''));

            if (subResult.meta.requestStatus === 'fulfilled') {
                setChangePasswordResult('Пароль успешно изменен');
            }
        }

        handleChangesCancel();
    });

    return (
        <VStack max justify="center" align="stretch">
            <h2 style={{ textAlign: 'center', width: '100%' }}>
                {t('Безопасность')}
            </h2>

            <form onSubmit={onSubmit}>
                <YupInput
                    className={classes.yupInput}
                    inputType="password"
                    customValue={isEditable ? '' : 'пасхалка'}
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
                    }}
                />

                {isEditable && (
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

                {isEditable && (
                    <HStack max justify="end">
                        <Button
                            style={{ marginTop: 30 }}
                            type="submit"
                        >
                            {t('Изменить пароль!')}
                        </Button>
                        <Button
                            style={{ marginTop: 30 }}
                            onClick={handleChangesCancel}
                            variant="danger"
                        >
                            {t('Отменить')}
                        </Button>
                    </HStack>
                )}
            </form>

            {!isEditable && (
                <Button
                    style={{ marginTop: 30 }}
                    onClick={() => setIsEditable(true)}
                    variant="primary-outline"
                >
                    {t('Изменить пароль')}
                </Button>
            )}

            {checkPasswordError && (
                <Alert variant="danger">
                    {checkPasswordError}
                </Alert>
            )}
            {changePasswordResult && (
                <Alert variant="success">
                    {changePasswordResult}
                </Alert>
            )}
        </VStack>
    );
});
