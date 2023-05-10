import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from 'shared/UI/Input';
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

    const SignupSchema = Yup.object({
        email: Yup.string()
            .email('Неправильно введена почта')
            .required('Обязательное поле'),

        phoneNumber: Yup.string()
            .matches(/^\d{11}$/, 'Неправильно введен номер телефона')
            .required('Обязательное поле'),
    }).required();

    const {
        register, formState: { errors },
    } = useForm({
        resolver: yupResolver(SignupSchema),
    });

    return (
        <VStack className={classes.formWrapper} gap="4" justify="start" align="center">
            <form
                onSubmit={onSubmit}
                className={classes.Form}
            >

                <p className={classes.orWrapper}>или</p>

                <input
                    placeholder="Номер телефона"
                    className={classNames(classes.input, {
                        [classes.error]: !!errors.phoneNumber,
                    })}
                    {...register('phoneNumber')}
                    id="phoneNumber"
                />
                {errors.phoneNumber && (
                    <span
                        className={classes.errorMessage}
                    >
                        {`* ${errors.phoneNumber.message}`}
                    </span>
                )}

                <p className={classes.sendWrapper}>
                    На него мы отправим код
                    <b>{' подтверждения'}</b>
                    .
                </p>
            </form>
        </VStack>
    );
});
