/**
 * Потому что я могу словами через рот это объяснить
 */

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { VStack } from 'shared/UI/Stack';
import { addQueryParams } from 'shared/url/addQueryParams/addQueryParams';
import { PlatformCard } from 'entities/Platform';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchPlatforms, getFetchPlatformsIsLoading, getPlatforms, getPlatformsReducer,
} from 'features/getPlatforms';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
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
    const searchQueryFromUrl = params.get('q');

    const [searchQuery, setSearchQuery] = useState<string>(searchQueryFromUrl || '');

    const dispatch = useAppDispatch();
    const platforms = useSelector(getPlatforms.selectAll);
    const isLoading = useSelector(getFetchPlatformsIsLoading);

    useEffect(() => {
        if (platforms.length) return;
        dispatch(fetchPlatforms({ query: 'sdkjfgn' }));
    }, [dispatch, platforms.length]);

    const setSearchQueryHandler = useCallback((value: string) => {
        setSearchQuery(value);
    }, []);

    const onSubmitSearch = useCallback(() => {
        addQueryParams({ q: searchQuery });
        // TODO запрос на поиск площадок
    }, [searchQuery]);

    return (
        <DynamicModuleLoader removeAfterUnmount={false} reducers={reducers}>
            <Page className={classNames(classes.SearchPage, {}, [className])}>
                <VStack gap="20" justify="start" align="center">
                    {/* TODO переписать этот дублирующийся код (с мейн пейдж) */}
                    <h1 className={classes.mainHeader}>
                        ПРОЩЕ
                    </h1>
                    <p className={classes.subtitle}>
                        Найти через ПОИСК
                    </p>
                </VStack>
                <div className={classes.searchResults}>
                    {platforms.length
                        ? platforms.map((platform) => (
                            <AppLink to={`${RoutePath.platform_page}${platform._id}`}>
                                <PlatformCard
                                    key={platform._id}
                                    platform={platform}
                                    type="searchCard"
                                />
                            </AppLink>
                        ))
                        : new Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <Skeleton
                                    key={index}
                                    width="100%"
                                    height={120}
                                    border="35px"
                                />
                            ))}
                </div>
            </Page>
        </DynamicModuleLoader>
    );
});

export default SearchPage;
