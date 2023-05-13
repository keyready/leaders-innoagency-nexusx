import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './PlatformHeader.module.scss';

interface PlatformHeaderProps {
    className?: string;
    image?: string;
    name?: string;
}

export const PlatformHeader = memo((props: PlatformHeaderProps) => {
    const {
        className,
        image,
        name,
    } = props;
    const { t } = useTranslation();

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
