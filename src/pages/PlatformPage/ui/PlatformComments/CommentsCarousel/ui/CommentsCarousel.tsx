import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { Platform } from 'entities/Platform';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CommentCard } from 'entities/Comment';
import { Carousel } from 'widgets/Carousel';
import { HStack } from 'shared/UI/Stack';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classes from './CommentsCarousel.module.scss';
import { getPlatformComments } from '../../../../model/slices/PlatformCommentsSlice';
import { fetchCommentsByPlatformId } from '../../../../model/services/fetchCommentsByPlatformId';
import {
    getCommentsError,
    getCommentsIsLoading,
} from '../../../../model/selectors/getCommetsStatus';

interface CommentsCarouselProps {
    className?: string;
    platform?: Platform;
}

export const CommentsCarousel = memo((props: CommentsCarouselProps) => {
    const {
        className,
        platform,
    } = props;

    const { t } = useTranslation('PlatformPage');
    const comments = useSelector(getPlatformComments.selectAll);
    const isCommentsLoading = useSelector(getCommentsIsLoading);
    const commentsError = useSelector(getCommentsError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCommentsByPlatformId(platform?._id));
    }, [dispatch, platform?._id]);

    if (isCommentsLoading) {
        return (
            <div className={classes.CommentsCarouselWrapper}>
                <h2 className={classes.header}>{t('Комментарии')}</h2>
                <HStack gap="20" max justify="center" align="center">
                    <Skeleton width="100%" height={200} border="20px" />
                    <Skeleton width="100%" height={200} border="20px" />
                </HStack>
            </div>
        );
    }

    if (commentsError) {
        return (
            <div className={classes.CommentsCarouselWrapper}>
                <h3>{commentsError}</h3>
            </div>
        );
    }

    if (!comments.length) {
        return (
            <div className={classes.CommentsCarouselWrapper}>
                <h4
                    style={{ textAlign: 'center' }}
                >
                    {t('Комментариев нет. Станьте первым!')}
                </h4>
            </div>
        );
    }
    const getCommentsCards = () => {
        const cards = [];

        for (let i = 0; i < comments.length; i += 2) {
            const comment1 = comments[i];
            const comment2 = comments[i + 1];

            const card1 = comment1 && (
                <CommentCard key={comment1._id} comment={comment1} />
            );

            const card2 = comment2 && (
                <CommentCard key={comment2._id} comment={comment2} />
            );

            const card = (
                <HStack gap="20" align="center" justify="center">
                    {card1}
                    {card2}
                </HStack>
            );

            cards.push(card);
        }

        return cards;
    };
    const commentsCards = getCommentsCards();

    return (
        <div className={classes.CommentsCarouselWrapper}>
            <h2 className={classes.header}>{t('Комментарии')}</h2>
            <Carousel
                content={commentsCards || []}
            />
        </div>
    );
});
