import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './GetComments.module.scss';

interface GetCommentsProps {
    className?: string;
}

export const GetComments = memo((props: GetCommentsProps) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.GetComments, {}, [className])} />
    );
});
