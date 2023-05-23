import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
    getPlatformById, getPlatformData, getPlatformIsLoading, PlatformReducer,
} from 'entities/Platform';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { BookPlatformCard, bookPlatformReducer } from 'features/bookPlatform';
import { YMaps } from 'widgets/YMaps';
import { getMetroStationCoords, getMetroStationData, getMetroStationReducer } from 'features/getMetroStation';
import { CommentsBlock } from '../PlatformComments/CommentsBlock';
import { platformPageReducers } from '../../model/slices/index';
import { RestrictionsSection } from '../RestrictionsSection/ui/RestrictionsSection';
import { PlatformBody } from '../PlatformBody/PlatformBody';
import { PlatformHeader } from '../PlatformHeader/PlatformHeader';
import classes from './PlatformPage.module.scss';

interface PlatformPageProps {
    className?: string;
}

const reducers: ReducersList = {
    platformPage: platformPageReducers,
    platform: PlatformReducer,
    metroStation: getMetroStationReducer,
    bookPlatform: bookPlatformReducer,
};

const PlatformPage = memo((props: PlatformPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const { id } = useParams();

    const platform = useSelector(getPlatformData);
    const isPlatformLoading = useSelector(getPlatformIsLoading);
    // @ts-ignore
    const metroCoords: number[] = useSelector(getMetroStationCoords);

    useEffect(() => {
        dispatch(getPlatformById(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getMetroStationData(platform?.metro));
    }, [dispatch, platform?.metro]);

    const reloadPlatformData = useCallback(() => {
        dispatch(getPlatformById(platform?._id));
    }, [dispatch, platform?._id]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.PlatformPage, {}, [className])}>
                <PlatformHeader
                    className={classes.header}
                    name={platform?.name}
                    image={platform?.images[0]}
                    isLoading={isPlatformLoading}
                />
                <PlatformBody platform={platform} isLoading={isPlatformLoading} />
                {platform?.restrictions && (
                    <RestrictionsSection platform={platform} />
                )}
                <BookPlatformCard platform={platform} onSuccessBooking={reloadPlatformData} />
                {!isPlatformLoading && (
                    <div className={classes.contactsWrapper}>
                        <h2>Где нас найти?</h2>
                        <YMaps
                            className={classes.mapWrapper}
                            place={platform?.address || ''}
                            metroCoords={metroCoords}
                            metroName={platform?.metro}
                        />
                    </div>
                )}

                <CommentsBlock platform={platform} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default PlatformPage;
