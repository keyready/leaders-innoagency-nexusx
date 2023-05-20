import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
    PlatformReducer, getPlatformById, getPlatformData, getPlatformIsLoading,
} from 'entities/Platform';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CommentReducer } from 'entities/Comment';
import { BookPlatformCard } from 'features/bookPlatform';
import { YMaps } from 'widgets/YMaps';
import { PlatformBody } from '../PlatformBody/PlatformBody';
import { PlatformHeader } from '../PlatformHeader/PlatformHeader';
import classes from './PlatformPage.module.scss';

interface PlatformPageProps {
    className?: string;
}

const reducers: ReducersList = {
    platform: PlatformReducer,
    comment: CommentReducer,
};

const PlatformPage = memo((props: PlatformPageProps) => {
    const { className } = props;

    const { t } = useTranslation('PlatformPage');
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const platform = useSelector(getPlatformData);
    const isPlatformLoading = useSelector(getPlatformIsLoading);

    useEffect(() => {
        if (id) {
            dispatch(getPlatformById(id));
        }
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader removeAfterUnmount={false} reducers={reducers}>
            <Page className={classNames(classes.PlatformPage, {}, [className])}>
                <PlatformHeader
                    className={classes.header}
                    name={platform?.name}
                    image={platform?.images[0]}
                    isLoading={isPlatformLoading}
                />
                <PlatformBody platform={platform} isLoading={isPlatformLoading} />
                <BookPlatformCard />
                <YMaps place="г. Санкт-Петербург, Пионерская 26" />
            </Page>
        </DynamicModuleLoader>
    );
});

export default PlatformPage;
