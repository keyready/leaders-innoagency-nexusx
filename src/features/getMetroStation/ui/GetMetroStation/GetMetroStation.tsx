import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './GetMetroStation.module.scss';

interface GetMetroStationProps {
    className?: string;
}

export const GetMetroStation = memo((props: GetMetroStationProps) => {
    const { className } = props;
    const { t } = useTranslation('GetMetroStation');

    return (
        <div className={classNames(classes.GetMetroStation, {}, [className])} />
    );
});
