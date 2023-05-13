import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useEffect } from 'react';
import * as Yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import classes from './StepFifthForm.module.scss';

interface StepFifthFormProps {
    className?: string;
    onSubmitStep: (data: FieldValues) => void;
    email?: string;
    phoneNumber?: string;
}

export const StepFifthForm = memo((props: StepFifthFormProps) => {
    const {
        className,
        onSubmitStep,
        phoneNumber,
        email,
    } = props;

    const { t } = useTranslation('RegisterPage');

    const ExtraProfileSchema = Yup.object({
        dateOfBirth: Yup.date()
            .max(new Date(), t('Дата рождения не может быть в будущем') as string)
            .max(new Date(
                new Date().getFullYear() - 16,
                new Date().getMonth(),
                new Date().getDate(),
            ), t('Минимальный возраст 16 лет') as string)
            .required(t('Введите дату рождения') as string),
        email: email
            ? Yup.string()
            : Yup.string()
                .email('Неправильно введена почта')
                .required('Обязательное поле'),

        phoneNumber: phoneNumber
            ? Yup.string()
            : Yup.string()
                .matches(/^\d{11}$/, 'Неправильно введен номер телефона')
                .required('Обязательное поле'),

    }).required();

    const {
        register, setValue, watch, formState: { errors }, handleSubmit,
    } = useForm({
        resolver: yupResolver(ExtraProfileSchema),
    });

    const onSubmit = handleSubmit((data) => {
        onSubmitStep(data);
    });

    useEffect(() => {
        console.log(new Date(
            new Date().getFullYear() - 16,
            new Date().getMonth(),
            new Date().getDate(),
        ));
    }, []);

    return (
        <div className={classNames(classes.StepFifthForm, {}, [className])}>
            <p className={classes.text}>{t('Давайте заполним Ваш профиль!')}</p>
            <form onSubmit={onSubmit} className={classes.form}>
                <Input
                    // @ts-ignore
                    errors={errors}
                    name="dateOfBirth"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    inputType="date"
                />

                <Input
                    // @ts-ignore
                    errors={errors}
                    placeholder={t('Номер телефона') as string}
                    name="phoneNumber"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    defaultValue={phoneNumber}
                />

                <Input
                    defaultValue={email}
                    // @ts-ignore
                    errors={errors}
                    placeholder={t('Email') as string}
                    name="email"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                />

                <Button style={{ width: '100%' }} type="submit">Далее</Button>
            </form>
        </div>
    );
});
