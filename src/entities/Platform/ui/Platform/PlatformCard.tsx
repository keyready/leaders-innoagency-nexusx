import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './PlatformCard.module.scss';

interface PlatformProps {
    className?: string;
}

export const PlatformCard = memo((props: PlatformProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.PlatformCard, {}, [className])} />
    );
});
