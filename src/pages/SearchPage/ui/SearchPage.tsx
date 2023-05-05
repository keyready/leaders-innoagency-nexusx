/**
 * Потому что я могу словами через рот это объяснить
 */

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from 'shared/UI/Input';
import { HStack, VStack } from 'shared/UI/Stack';
import { addQueryParams } from 'shared/url/addQueryParams/addQueryParams';
import { CostBadges } from 'shared/UI/CostBadges';
import { PlatformCard } from 'entities/Platform';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchPlatforms, getFetchPlatformError, getPlatforms, getPlatformsReducer,
} from 'features/getPlatforms';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
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
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.SearchPage, {}, [className])}>
                <VStack gap="20" justify="start" align="center">
                    {/* TODO переписать этот дублирующийся код (с мейн пейдж) */}
                    <h1 className={classes.mainHeader}>
                        ПРОЩЕ
                    </h1>
                    <p className={classes.subtitle}>
                        Найти через ПОИСК
                    </p>
                    <Input
                        className={classNames(
                            classes.searchInput,
                            { [classes.expandSearch]: searchQuery !== '' },
                        )}
                        placeholder="Поиск"
                        inputType="search"
                        value={searchQuery}
                        onChange={setSearchQueryHandler}
                        onSubmit={onSubmitSearch}
                    />
                </VStack>
                <div className={classes.searchResults}>
                    {platforms
                        .map((platform) => (
                            <PlatformCard
                                key={platform._id}
                                platform={platform}
                                type="searchCard"
                            />
                        ))}
                </div>
            </Page>
        </DynamicModuleLoader>
    );
});

export default SearchPage;
