import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { YupInput } from 'widgets/YupInput';
import { Button } from 'shared/UI/Button';
import classes from './StepThreeForm.module.scss';

interface StepThreeFormProps {
    className?: string;
    onSubmitStep: (data: FieldValues) => void;
}

export const StepThreeForm = memo((props: StepThreeFormProps) => {
    const {
        className,
        onSubmitStep,
    } = props;

    const { t } = useTranslation('RegisterPage');

    const PasswordSchema = Yup.object({
        password: Yup.string()
            .required(t('required_field') as string)
            .min(6, t('too_short') as string)
            .max(30, t('too_long') as string)
            .matches(/[!#$%&*]/, t('spec_symbols') as string),

        submitPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('Пароли должны совпадать') as string)
            .required(t('required_field') as string),
    }).required();

    const {
        register, setValue, watch, formState: { errors }, handleSubmit,
    } = useForm({
        resolver: yupResolver(PasswordSchema),
    });

    const onSubmit = handleSubmit((data) => {
        onSubmitStep(data);
    });

    return (
        <div className={classNames(classes.StepThreeForm, {}, [className])}>
            <p className={classes.text}>{t('Время придумать пароль! Не забудьте сохранить.')}</p>
            <form onSubmit={onSubmit} className={classes.form}>
                <YupInput
                    placeholder={t('Пароль') as string}
                    // @ts-ignore
                    errors={errors}
                    name="password"
                    inputType="password"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                />

                <YupInput
                    placeholder={t('Повторите пароль') as string}
                    // @ts-ignore
                    errors={errors}
                    name="submitPassword"
                    inputType="password"
                    register={register}
                    watch={watch}
                    setValue={setValue}
                />

                <Button style={{ width: '100%' }} type="submit">Далее</Button>
            </form>
        </div>
    );
});
