import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { getCommentData, getCommentIsLoading } from '../../model/selectors/getCommentData';
import classes from './CommentCard.module.scss';
import { fetchCommentById } from '../../model/services/fetchCommentById';

interface CommentCardProps {
    className?: string;
    platformId?: string;
    header?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className, platformId, header,
    } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const comment = useSelector(getCommentData);
    const isLoading = useSelector(getCommentIsLoading);

    useEffect(() => {
        if (platformId) {
            dispatch(fetchCommentById(platformId));
        }
    }, [dispatch, platformId]);

    if (isLoading) {
        return (
            <Card
                className={classNames(classes.Comment, {}, [className])}
            >
                <VStack justify="stretch" gap="20">
                    <HStack max align="stretch" justify="center" gap="32">
                        <Skeleton width={100} height={100} border="50%" />
                        <VStack
                            className={classes.skeletonVStack}
                            justify="center"
                            gap="16"
                            align="start"
                        >
                            <Skeleton width="100%" height={20} border="5px" />
                            <Skeleton width="100%" height={20} border="5px" />
                        </VStack>
                    </HStack>
                    <Skeleton width="100%" height={20} border="5px" />
                    <Skeleton width="100%" height={20} border="5px" />
                    <Skeleton width="100%" height={20} border="5px" />
                    <Skeleton width="100%" height={20} border="5px" />
                </VStack>
            </Card>
        );
    }

    return (
        <Card
            className={classNames(classes.Comment, {}, [className])}
        >
            <VStack justify="stretch" gap="20">
                {header && (
                    <h2 className={classes.header}>Отзывы</h2>
                )}
                <HStack max align="center" justify="center" gap="32">
                    <img
                        className={classes.avatar}
                        src={comment?.user.avatar}
                        alt={comment?.user.firstname}
                    />
                    <VStack justify="center" align="start">
                        <p className={classes.commentName}>{comment?.user.lastname}</p>
                        <p className={classes.commentName}>{comment?.user.firstname}</p>
                    </VStack>
                </HStack>
                <p className={classes.commentBody}>{comment?.body}</p>
            </VStack>
        </Card>
    );
});
