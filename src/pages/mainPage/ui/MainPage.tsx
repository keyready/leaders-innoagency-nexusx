import { Page } from 'widgets/Page/Page';
import React, { useCallback, useEffect, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Card, CardSize } from 'shared/UI/Card/Card';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import BookIcon from 'shared/assets/icons/book.svg';
import PaintingIcon from 'shared/assets/icons/painting.svg';
import BagIcon from 'shared/assets/icons/bag.svg';
import SearchIcon from 'shared/assets/icons/search.svg';
import MarkerIcon from 'shared/assets/icons/marker.svg';
import MoscowIcon from 'shared/assets/icons/active-msc.svg';
import TicketIcon from 'shared/assets/icons/ticket.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { classNames } from 'shared/lib/classNames/classNames';
import { useNavigate } from 'react-router';
import { Combobox, ComboboxItem } from 'shared/UI/Combobox';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    fetchPlatforms, getFetchPlatformError, getPlatforms, getPlatformsReducer,
} from 'features/getPlatforms';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { CostBadges } from 'shared/UI/CostBadges';
import { PlatformCard } from 'entities/Platform';
import classes from './MainPage.module.scss';

const reducers: ReducersList = {
    getPlatforms: getPlatformsReducer,
};

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState<ComboboxItem>({ value: '', content: '' });
    const [comboQuery, setComboQuery] = useState<string>('');
    const [blurBackground, setBlurBackground] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchPlatforms());

        document.addEventListener('keypress', (ev) => {
            if (ev.key === 'Enter' && blurBackground) {
                navigate(`/search?q=${selected.value}`);
            }
        });
    }, [blurBackground, dispatch, navigate, selected.value]);

    const platforms = useSelector(getPlatforms.selectAll);
    const error = useSelector(getFetchPlatformError);

    const getPlatformItems = useCallback(() => platforms.map((platform) => ({
        value: platform.name,
        content: (<PlatformCard platform={platform} type="searchCard" />),
    })), [platforms]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page>
                <VStack gap="20" justify="start" align="center">
                    <h1 className={classes.mainHeader}>
                        ПРОЩЕ
                    </h1>
                    <p className={classes.subtitle}>
                        Найти через ПОИСК
                    </p>
                    <Combobox
                        className={classNames(
                            classes.searchInput,
                            { [classes.expandSearch]: comboQuery !== '' },
                        )}
                        items={getPlatformItems().slice(0, 3)}
                        query={comboQuery}
                        setQuery={setComboQuery}
                        selectedPerson={selected}
                        setSelectedPerson={setSelected}
                        placeholder="Поиск"
                        onFocus={() => setBlurBackground(true)}
                        onBlur={() => setBlurBackground(false)}
                        onResultsClick={() => {
                            navigate(`/search?q=${comboQuery}`);
                        }}
                    />
                    <p>или</p>
                    <h2 className={classes.subheader}>Популярные категории</h2>
                </VStack>
                <div
                    className={classNames(classes.wrapper, {
                        [classes.blurred]: blurBackground,
                    })}
                >
                    <VStack
                        gap="16"
                        align="start"

                    >
                        <HStack gap="16" max align="center" justify="center">
                            <Card
                                size={CardSize.EXPAND}
                            >
                                <Icon Svg={CalendarIcon} className={classes.mainIcons} />
                                <h2 className={classes.typesTitle}>Коворкинги</h2>
                            </Card>
                            <Card
                                size={CardSize.EXPAND}
                            >
                                <Icon Svg={BookIcon} className={classes.mainIcons} />
                                <h2 className={classes.typesTitle}>Мероприятия</h2>
                            </Card>
                            <Card
                                size={CardSize.EXPAND}
                            >
                                <Icon Svg={PaintingIcon} className={classes.mainIcons} />
                                <h2 className={classes.typesTitle}>Выставки</h2>
                            </Card>
                        </HStack>
                        <HStack gap="16" max justify="center">
                            <Card
                                size={CardSize.EXPAND}
                            >
                                <Icon Svg={BagIcon} className={classes.mainIcons} />
                                <h2 className={classes.typesTitle}>Мастер-классы</h2>
                            </Card>
                            <Card
                                size={CardSize.EXPAND}
                            >
                                <Icon Svg={MarkerIcon} className={classes.mainIcons} />
                                <h2 className={classes.typesTitle}>Аренда помещений</h2>
                            </Card>
                        </HStack>
                    </VStack>

                    <VStack
                        className={classes.title}
                        gap="20"
                        justify="start"
                        align="center"
                    >
                        <h1 className={classes.mainHeader}>
                            ПРОЩЕ
                        </h1>
                        <p className={classes.subtitle}>
                            Агрегатор креатива
                        </p>
                        <h2 className={classes.subheader}>
                            Что мы помогаем делать
                            <b>
                                {' ПРОЩЕ'}
                            </b>
                            ?
                        </h2>
                        <VStack max gap="20">
                            <HStack gap="32" max justify="center" className={classes.parentDivs}>
                                <Card className={classes.card}>
                                    <HStack gap="32" max justify="center">
                                        <Icon Svg={PaintingIcon} className={classes.cardIcon} />
                                        <VStack max justify="start">
                                            <h3 className={classes.cardTitle}>Творить</h3>
                                            <p className={classes.cardText}>
                                                <b>ПРОЩЕ</b>
                                                {' '}
                                                помогает найти не только интересные мероприятия, но и новые знакомства среди
                                                таких же креативных людей, как и Вы! Творите вместе, познавайте, изучайте и
                                                просто приятно проводите время.
                                            </p>
                                        </VStack>
                                    </HStack>
                                </Card>
                                <Card className={classes.card}>
                                    <HStack gap="32" max justify="center">
                                        <Icon Svg={SearchIcon} className={classes.cardIcon} />
                                        <VStack max justify="start">
                                            <h3 className={classes.cardTitle}>Найти</h3>
                                            <p className={classes.cardText}>
                                                Собираем мероприятия и места со всего Интернета в одном месте. Затем
                                                сортируем, распределяем по категориям, фильтруем и модерируем, чтобы Вам
                                                осталось только выбрать самое лучшее!
                                            </p>
                                        </VStack>
                                    </HStack>
                                </Card>
                            </HStack>
                            <HStack gap="32" max justify="center" className={classes.parentDivs}>
                                <Card className={classes.card}>
                                    <HStack gap="32" max justify="center">
                                        <Icon Svg={CalendarIcon} className={classes.cardIcon} />
                                        <VStack max justify="start">
                                            <h3 className={classes.cardTitle}>Забронировать</h3>
                                            <p className={classes.cardText}>
                                                Связываем с организаторами и арендодателями, сохраняем Ваши билеты в удобной
                                                системе и помогаем не заблудиться на месте. Мы с Вами на всем пути и поможем
                                                связаться с администраторами, если возникнут сложности!
                                            </p>
                                        </VStack>
                                    </HStack>
                                </Card>
                                <Card className={classes.card}>
                                    <HStack gap="32" max justify="center">
                                        <Icon Svg={BagIcon} className={classes.cardIcon} />
                                        <VStack max justify="start">
                                            <h3 className={classes.cardTitle}>Организовать</h3>
                                            <p className={classes.cardText}>
                                                Мы понимаем, что организаторам приходится непросто. Но можем сделать Вашу
                                                задачу сильно
                                                {' '}
                                                <b>ПРОЩЕ</b>
                                                : удобный и понятный интерфейс, выверенная система оповещений и, конечно,
                                                сбор статистики.
                                            </p>
                                        </VStack>
                                    </HStack>
                                </Card>
                            </HStack>
                        </VStack>
                    </VStack>

                    <VStack
                        className={classes.title}
                        gap="20"
                        justify="start"
                        align="center"
                    >
                        <h2 className={classes.subheader}>
                            Кому мы помогаем?
                        </h2>
                        <HStack gap="32" max justify="center">
                            <Card className={classes.helpsCard}>
                                <VStack max align="center">
                                    <Icon Svg={MoscowIcon} className={classes.helpsIcon} />
                                    <h2 className={classes.helpsText}>Активным москвичам</h2>
                                </VStack>
                            </Card>
                            <Card>
                                <VStack max align="center">
                                    <Icon Svg={TicketIcon} className={classes.helpsIcon} />
                                    <h2 className={classes.helpsText}>Организаторам</h2>
                                </VStack>
                            </Card>
                        </HStack>
                    </VStack>
                </div>
            </Page>
        </DynamicModuleLoader>
    );
};

export default MainPage;
