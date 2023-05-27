import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './ComplaintCard.module.scss';

interface ComplaintCardProps {
    className?: string;
}

export const ComplaintCard = memo((props: ComplaintCardProps) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(classes.ComplaintCard, {}, [className])} />
    );
});
