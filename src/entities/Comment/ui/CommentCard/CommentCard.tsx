import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
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
