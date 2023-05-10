import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from 'shared/UI/Input';
import { useTranslation } from 'react-i18next';
import classes from './StepOneForm.module.scss';

interface StepOneFormProps {
    className?: string;
    onSubmit: () => void;
}

export const StepOneForm = memo((props: StepOneFormProps) => {
    const {
        className,
        onSubmit,
    } = props;

    const { t } = useTranslation('RegisterPage');

    const SignupSchema = Yup.object({
        email: Yup.string()
            .email('Неправильно введена почта')
            .required('Обязательное поле'),

        phoneNumber: Yup.string()
            .matches(/^\d{11}$/, 'Неправильно введен номер телефона')
            .required('Обязательное поле'),
    }).required();

    const {
        register, setValue, watch, formState: { errors },
    } = useForm();

    return (
        <VStack className={classes.formWrapper} gap="4" justify="start" align="center">
            <form
                onSubmit={onSubmit}
                className={classes.Form}
            >
                <Input
                    placeholder={t('Email') as string}
                    className={classNames(classes.input, {
                        [classes.error]: !!errors.phoneNumber,
                    })}
                    watch={watch}
                    setValue={setValue}
                    register={register}
                    name="email"
                    // @ts-ignore
                    errors={errors}
                />

                <p className={classes.orWrapper}>{t('или')}</p>

                <Input
                    placeholder={t('Номер телефона') as string}
                    className={classNames(classes.input, {
                        [classes.error]: !!errors.phoneNumber,
                    })}
                    watch={watch}
                    setValue={setValue}
                    register={register}
                    name="phoneNumber"
                    // @ts-ignore
                    errors={errors}
                />

                <p className={classes.sendWrapper}>
                    {t('На него мы отправим код')}
                    <b>{t('подтверждения')}</b>
                    .
                </p>
            </form>
        </VStack>
    );
});
