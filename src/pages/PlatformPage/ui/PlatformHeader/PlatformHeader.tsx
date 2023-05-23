import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getPlatformData, getPlatformIsLoading } from 'entities/Platform';
import classes from './PlatformHeader.module.scss';

interface PlatformHeaderProps {
    className?: string;
}

export const PlatformHeader = memo((props: PlatformHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const isLoading = useSelector(getPlatformIsLoading);
    const image = useSelector(getPlatformData)?.images[0];
    const name = useSelector(getPlatformData)?.name;

    if (isLoading) {
        return (
            <div className={classNames(classes.PlatformHeader, {}, [className])}>
                <Skeleton
                    width="100%"
                    height={400}
                    border="10px"
                />
            </div>
        );
    }

    return (
        <div className={classNames(classes.PlatformHeader, {}, [className])}>
            <div
                className={classes.PlatformHeaderImage}
                style={{
                    backgroundImage: `linear-gradient(93.03deg, rgba(154, 187, 236, 0.8) 0%, rgba(97, 150, 228, 0.8) 100%), url(${image})`,
                }}
            />
            <h2 className={classes.HeaderTitle}>{name}</h2>
        </div>
    );
});
