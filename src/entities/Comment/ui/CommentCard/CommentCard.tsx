import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Button } from 'shared/UI/Button';
import CancelIcon from 'shared/assets/icons/ban.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { deleteComment } from 'features/getComments';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Comment } from '../../model/types/CommentSchema';
import classes from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className, comment, isLoading,
    } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const user = useSelector(getUserAuthData);
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

    const deleteCommentHandler = useCallback(() => {
        if (!comment?._id) {
            alert(t('Не удалось удалить комментарий') as string);
            return;
        }
        dispatch(deleteComment(comment?._id));
    }, [comment?._id, dispatch, t]);

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
                <h3>{`Платформа ${comment?.platformTitle}`}</h3>
                <HStack max align="center" justify="center" gap="32">
                    <img
                        className={classes.avatar}
                        src={comment?.user ? comment?.user.avatar : ''}
                        alt={comment?.user ? comment?.user.firstname : ''}
                    />
                    <VStack justify="center" align="start">
                        <p className={classes.commentName}>{comment?.user ? comment?.user.lastname : ''}</p>
                        <p className={classes.commentName}>{comment?.user ? comment?.user.firstname : ''}</p>
                    </VStack>
                </HStack>
                <p className={classes.commentBody}>{comment?.body}</p>
                {user?._id === comment?.userId && (
                    <HStack
                        max
                        justify="end"
                    >
                        <Button
                            onMouseEnter={() => setShowDeleteButton(true)}
                            onMouseLeave={() => setShowDeleteButton(false)}
                            onClick={deleteCommentHandler}
                            variant="danger"
                        >
                            <HStack max justify="center" align="center">
                                {showDeleteButton && (
                                    <span>{t('Удалить комментарий')}</span>
                                )}
                                <Icon Svg={CancelIcon} className={classes.icon} />
                            </HStack>
                        </Button>
                    </HStack>
                )}
            </VStack>
        </Card>
    );
});
