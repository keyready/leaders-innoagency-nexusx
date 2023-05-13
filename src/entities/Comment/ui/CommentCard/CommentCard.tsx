import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { getCommentData } from '../../model/selectors/getCommentData';
import classes from './CommentCard.module.scss';
import { fetchCommentById } from '../../model/services/fetchCommentById';

interface CommentCardProps {
    className?: string;
    platformId?: string;
    header?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, platformId, header } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const comment = useSelector(getCommentData);

    useEffect(() => {
        if (platformId) {
            dispatch(fetchCommentById(platformId));
        }
    }, [dispatch, platformId]);

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
