import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchPlatformsListQuery } from 'pages/SearchPage';
import { PageLoader } from 'shared/UI/PageLoader';
import { Page } from 'widgets/Page/Page';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { VStack } from 'shared/UI/Stack';
import { YMaps } from 'widgets/YMaps';
import { string } from 'yup';
import { Platform } from 'entities/Platform';
import classes from './MapPage.module.scss';

interface MapPageProps {
    className?: string;
}

const MapPage = memo((props: MapPageProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const { data: platforms, isLoading, error } = useSearchPlatformsListQuery('');

    if (isLoading) {
        return (
            <Page>
                <VStack max justify="center" align="center">
                    <Skeleton width="100%" height={600} border="10px" />
                </VStack>
            </Page>
        );
    }

    const getProperties = (propertyName: string): string[] => {
        const result: string[] = [];
        if (!platforms) return [];

        for (let i = 0; i < platforms.length; i += 1) {
            const obj: Platform = platforms[i];
            result.push(obj[propertyName as keyof Platform] as string);
        }
        return result;
    };

    return (
        <Page className={classNames(classes.MapPage, {}, [className])}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
                {t('Где ПРОЩЕ заниматься в г. Москве')}
            </h2>
            <YMaps
                markers={getProperties('address')}
            />
        </Page>
    );
});

export default MapPage;
