import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import { useForm } from 'react-hook-form';
import { Input } from 'shared/UI/Input';
import { Timepicker } from 'widgets/Timepicker';
import classes from './BookPlatform.module.scss';

interface BookPlatformCardProps {
    className?: string;
}

export const BookPlatformCard = memo((props: BookPlatformCardProps) => {
    const { className } = props;
    const { t } = useTranslation('PlatformPage');

    const {
        handleSubmit, setValue, watch, register, formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((data) => {

    });

    return (
        <Card className={classNames(classes.BookPlatform, {}, [className])}>
            <form className={classes.Form} onSubmit={onSubmit}>
                <h3 className={classes.header}>{t('Забронировать')}</h3>
            </form>
        </Card>
    );
});
