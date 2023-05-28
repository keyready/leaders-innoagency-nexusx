/**
 * Потому что я могу словами через рот это объяснить
 */

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import React, {
    FormEvent, memo, useCallback, useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { HStack, VStack } from 'shared/UI/Stack';
import { addQueryParams } from 'shared/url/addQueryParams/addQueryParams';
import { PlatformCard } from 'entities/Platform';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { getPlatformsReducer } from 'features/getPlatforms';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Input } from 'shared/UI/Input';
import { Paginator } from 'shared/UI/Paginator';
import { useSearchPlatformsListQuery } from '../api/searchPlatformsList';
import classes from './SearchPage.module.scss';

interface SearchPageProps {
    className?: string;
}

const reducers: ReducersList = {
    getPlatforms: getPlatformsReducer,
};

const SearchPage = memo((props: SearchPageProps) => {
    const {
        className,
    } = props;

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const searchQueryFromUrl = params.get('q') || '';

    const [searchQuery, setSearchQuery] = useState<string>(searchQueryFromUrl || '');
    const [page, setPage] = useState<number>(1);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();
    const {
        isLoading, isFetching, data: platforms, error,
    } = useSearchPlatformsListQuery({ page, q: searchQueryFromUrl });

    useEffect(() => {
        document.title = 'ПРОЩЕ | Поиск';
    }, [dispatch, searchQuery]);

    const onSubmitSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addQueryParams({ q: searchQuery });
        // TODO запрос на поиск площадок
    }, [searchQuery]);

    useEffect(() => {
        const handleSearchEnter = (ev: KeyboardEvent) => {
            if (ev.key === 'Enter') {
                navigate(`/search?q=${searchQuery}`);
            }
        };

        document.addEventListener('keypress', handleSearchEnter);
        return () => {
            document.removeEventListener('keypress', handleSearchEnter);
        };
    }, [navigate, searchQuery]);

    const header = (
        <VStack gap="20" justify="start" align="center">
            {/* TODO переписать этот дублирующийся код (с мейн пейдж) */}
            <h1 className={classes.mainHeader}>
                ПРОЩЕ
            </h1>
            <p className={classes.subtitle}>
                Найти через ПОИСК
            </p>
            <form onSubmit={onSubmitSearch}>
                <Input
                    className={classes.searchInput}
                    placeholder={t('Поиск по платформам') as string}
                    onChange={setSearchQuery}
                    value={searchQuery}
                />
            </form>
        </VStack>
    );

    return (
        <DynamicModuleLoader removeAfterUnmount={false} reducers={reducers}>
            <Page className={classNames(classes.SearchPage, {}, [className])}>
                {header}
                <div className={classes.searchResults}>
                    {!isLoading || !isFetching
                        ? platforms?.map((platform) => (
                            <AppLink to={`${RoutePath.platform_page}${platform._id}`}>
                                <PlatformCard
                                    key={platform._id}
                                    platform={platform}
                                    type="normal"
                                />
                            </AppLink>
                        ))
                        : new Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <Skeleton
                                    key={index}
                                    width="100%"
                                    height={180}
                                    border="35px"
                                />
                            ))}

                </div>
                {!platforms?.length && (
                    <HStack max align="center" justify="center">
                        <h3>{t('Ничего не найдено, попробуйте изменить запрос')}</h3>
                    </HStack>
                )}
                <HStack
                    className={classes.paginator}
                    max
                    align="center"
                    justify="center"
                >
                    <Paginator currentPage={page} setCurrentPage={setPage} />
                </HStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default SearchPage;
