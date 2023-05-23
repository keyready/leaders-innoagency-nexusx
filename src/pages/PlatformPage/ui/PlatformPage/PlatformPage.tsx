import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { BookPlatformCard, bookPlatformReducer } from 'features/bookPlatform';
import { getMetroStationReducer } from 'features/getMetroStation';
import { HStack } from 'shared/UI/Stack';
import { PlatformMaps } from '../PlatformMaps';
import { CommentsBlock } from '../PlatformComments/CommentsBlock';
import { platformPageReducers } from '../../model/slices/index';
import { RestrictionsSection } from '../RestrictionsSection';
import { PlatformBody } from '../PlatformBody/PlatformBody';
import { PlatformHeader } from '../PlatformHeader/PlatformHeader';
import classes from './PlatformPage.module.scss';

interface PlatformPageProps {
    className?: string;
}

const reducers: ReducersList = {
    platformPage: platformPageReducers,
    metroStation: getMetroStationReducer,
    bookPlatform: bookPlatformReducer,
};

const PlatformPage = memo((props: PlatformPageProps) => {
    const { className } = props;

    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <Page>
                <HStack max justify="center" align="center">
                    <h1>Платформа не найдена</h1>
                </HStack>
            </Page>
        );
    }

    return (
        <DynamicModuleLoader removeAfterUnmount={false} reducers={reducers}>
            <Page className={classNames(classes.PlatformPage, {}, [className])}>
                <PlatformHeader className={classes.header} />
                <PlatformBody id={id} />
                <RestrictionsSection />
                <BookPlatformCard id={id} />
                <PlatformMaps />
                <CommentsBlock />
            </Page>
        </DynamicModuleLoader>
    );
});

export default PlatformPage;
