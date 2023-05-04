/**
 * Потому что я могу словами через рот это объяснить
 */

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import React, { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from 'shared/UI/Input';
import { HStack, VStack } from 'shared/UI/Stack';
import { addQueryParams } from 'shared/url/addQueryParams/addQueryParams';
import { CostBadges } from 'shared/UI/CostBadges';
import { PlatformCard } from 'entities/Platform';
import classes from './SearchPage.module.scss';

interface SearchPageProps {
    className?: string;
}

const SearchPage = memo((props: SearchPageProps) => {
    const {
        className,
    } = props;

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const searchQueryFromUrl = params.get('q');
    const [searchQuery, setSearchQuery] = useState<string>(searchQueryFromUrl || '');

    const setSearchQueryHandler = useCallback((value: string) => {
        setSearchQuery(value);
    }, []);

    const onSubmitSearch = useCallback(() => {
        addQueryParams({ q: searchQuery });
        // TODO запрос на поиск площадок
    }, [searchQuery]);

    return (
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
                {new Array(7)
                    .fill(0)
                    .map((_, index) => (
                        <PlatformCard key={index} />
                    ))}
            </div>
        </Page>
    );
});

export default SearchPage;
