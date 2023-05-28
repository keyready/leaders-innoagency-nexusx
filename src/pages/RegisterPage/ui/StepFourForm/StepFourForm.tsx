import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { YupInput } from 'widgets/YupInput';
import { Button } from 'shared/UI/Button';
import classes from './StepFourForm.module.scss';

interface StepFourFormProps {
    className?: string;
    onSubmitStep: (data: FieldValues) => void;
    isLoading?: boolean;
}

export const StepFourForm = memo((props: StepFourFormProps) => {
    const {
        className,
        onSubmitStep,
        isLoading,
    } = props;

    const { t } = useTranslation('RegisterPage');

    const PersonalDataSchema = Yup.object({
        name: Yup.string()
            .matches(
                /^([А-ЯЁ][а-яё]{3,13})$/,
                t('Пожалуйста, используйте буквы русского алфавита') as string,
            )
            .required(t('required_field') as string),

        lastname: Yup.string()
            .matches(
                /^([А-ЯЁ][а-яё]{3,13})$/,
                t('Пожалуйста, используйте буквы русского алфавита') as string,
            )
            .required(t('required_field') as string),

    }).required();

    const {
        register, setValue, watch, formState: { errors }, handleSubmit,
    } = useForm({
        resolver: yupResolver(PersonalDataSchema),
    });

    const onSubmit = handleSubmit((data) => {
        onSubmitStep(data);
    });

    return (
        <div className={classNames(classes.StepFourForm, {}, [className])}>
            <p className={classes.text}>{t('Давайте заполним Ваш профиль!')}</p>
            <form onSubmit={onSubmit} className={classes.form}>
                <YupInput
                    placeholder={t('Имя') as string}
                    // @ts-ignore
                    errors={errors}
                    name="name"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                />

                <YupInput
                    placeholder={t('Фамилия') as string}
                    // @ts-ignore
                    errors={errors}
                    name="lastname"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                />

                <Button style={{ width: '100%' }} type="submit" disabled={isLoading}>
                    {isLoading ? t('Подождите...') : t('Далее')}
                </Button>
            </form>
        </div>
    );
});
