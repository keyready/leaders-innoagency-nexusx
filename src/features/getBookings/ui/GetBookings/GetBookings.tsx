import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './GetBookings.module.scss';

interface GetBookingsProps {
    className?: string;
}

export const GetBookings = memo((props: GetBookingsProps) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(classes.GetBookings, {}, [className])} />
    );
});
