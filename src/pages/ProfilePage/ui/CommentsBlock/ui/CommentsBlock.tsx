import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { Carousel } from 'widgets/Carousel';
import {
    fetchCommentsByUserId,
    getComments,
    getCommentsError,
    getCommentsIsLoading,
} from 'features/getComments';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { CommentCard } from 'entities/Comment';
import { Card } from 'shared/UI/Card/Card';
import classes from './CommentsBlock.module.scss';

interface CommentsBlockProps {
    className?: string;
}

export const CommentsBlock = memo((props: CommentsBlockProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('ProfilePage');
    const dispatch = useAppDispatch();

    const comments = useSelector(getComments.selectAll);
    const commentsIsLoading = useSelector(getCommentsIsLoading);
    const commentsError = useSelector(getCommentsError);
    const user = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(fetchCommentsByUserId(user?._id));
    }, [dispatch, user?._id]);

    if (commentsIsLoading) {
        return (
            <Skeleton width="100%" height={200} />
        );
    }

    if (commentsError) {
        return (
            <Page>
                <h3>
                    {t('Произошла какая-то ошибка. Приносим извинения за предоставленные неудобства')}
                </h3>
            </Page>
        );
    }

    if (!comments.length) {
        return (
            <Card>
                <h3>{t('Вы пока не оставили ни одного комментария ;(')}</h3>
            </Card>
        );
    }

    const commentsCarousel = () => comments.map((comment, index) => (
        <CommentCard
            key={index}
            comment={comment}
            isLoading={commentsIsLoading}
        />
    ));
    const carouselContent = commentsCarousel();

    return (
        <div className={classNames(classes.CommentsBlock, {}, [className])}>
            <h3 style={{ textAlign: 'center' }}>{t('Мои комментарии')}</h3>
            {carouselContent.length && (
                <Carousel content={carouselContent} />
            )}
        </div>
    );
});
