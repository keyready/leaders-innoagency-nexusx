import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './GetPlatforms.module.scss';

interface GetPlatformsProps {
    className?: string;
}

export const GetPlatforms = memo((props: GetPlatformsProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.GetPlatforms, {}, [className])} />
    );
});
