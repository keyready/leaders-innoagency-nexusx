import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './NotFound.module.scss';

interface NotFoundProps {
    className?: string;
}

export const NotFound = ({ className }: NotFoundProps) => {
    const { t } = useTranslation('NotFoundPage');

    useEffect(() => {
        document.title = '404 | Не найдено';
    }, []);

    return (
        <Page className={classNames(classes.NotFound, {}, [className])}>
            <h2>{t('not_found')}</h2>
            {/* <YMaps place="Санкт-петербург, ул. Пионерская, 26" /> */}
        </Page>
    );
};
