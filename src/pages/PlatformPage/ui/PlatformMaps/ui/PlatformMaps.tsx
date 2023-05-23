import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getPlatformData, getPlatformIsLoading } from 'entities/Platform';
import { YMaps } from 'widgets/YMaps';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classes from './PlatformMaps.module.scss';

interface PlatformMapsProps {
    className?: string;
}

export const PlatformMaps = memo((props: PlatformMapsProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const platform = useSelector(getPlatformData);
    const isPlatformLoading = useSelector(getPlatformIsLoading);

    if (isPlatformLoading) {
        return (
            <Skeleton width="100%" height="400px" />
        );
    }

    return (
        <div className={classes.contactsWrapper}>
            <h2>Где нас найти?</h2>
            <YMaps
                className={classes.mapWrapper}
                place={platform?.address || ''}
                metroName={platform?.metro}
            />
        </div>
    );
});
