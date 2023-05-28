import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import CancelIcon from 'shared/assets/icons/ban.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteBooking, makeBookingComment } from 'features/getBookings';
import { Input } from 'shared/UI/Input';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { Booking } from '../../model/types/BookingSchema';
import classes from './BookingCard.module.scss';

interface BookingCardProps {
    className?: string;
    booking: Booking;
    check?: boolean;
}

export const BookingCard = memo((props: BookingCardProps) => {
    const { className, booking, check = false } = props;

    const { t } = useTranslation('Booking');
    const dispatch = useAppDispatch();

    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
    const [bookingComment, setBookingComment] = useState<string>('');

    const deleteBookingHandler = useCallback(() => {
        if (!booking._id) {
            alert(t('Не удалось удалить бронирование') as string);
            return;
        }
        dispatch(deleteBooking(booking._id));
    }, [booking._id, dispatch, t]);

    const onMakeBookingCommentHandler = useCallback(() => {
        dispatch(makeBookingComment({
            comment: bookingComment,
            bookingId: booking._id,
        }));
    }, [bookingComment, dispatch]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric', month: 'long', year: 'numeric',
        });
    };
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <Card className={classNames(classes.BookingCard, {}, [className])}>
            <VStack
                gap="16"
                justify="start"
                align="center"
                className={classes.feedbackClasses}
            >
                {check && <h4>{t('Проверьте введенные данные')}</h4>}
                <HStack max>
                    <b>{`${t('Площадка')}:`}</b>
                    <p>{booking.platformTitle}</p>
                </HStack>
                {booking?.date && (
                    <HStack max>
                        <b>{`${t('Дата')}:`}</b>
                        <p>{`${formatDate(booking.date)}`}</p>
                    </HStack>
                )}
                <HStack max>
                    <b>{`${t('Время')}:`}</b>
                    <p>
                        {`${formatTime(booking?.startTime)} - ${formatTime(booking?.endTime)}`}
                    </p>
                </HStack>
                {booking.bookingPlaces && (
                    <HStack gap="8" max justify="start" align="start">
                        <b>{`${t('Места')}:`}</b>
                        <p>{booking.bookingPlaces}</p>
                    </HStack>
                )}
                {booking.body && (
                    <HStack gap="8" max justify="start" align="start">
                        <b>{`${t('Комментарий')}:`}</b>
                        <p style={{ textAlign: 'justify' }}>{booking.body}</p>
                    </HStack>
                )}

                {booking.comment && (
                    <HStack gap="8" max justify="start" align="start">
                        <b>{`${t('Отзыв')}:`}</b>
                        <TextArea
                            disabled
                            value={booking.comment}
                        />
                    </HStack>
                )}

                {booking.isFinished && !booking.comment && (
                    <VStack gap="8" max justify="start" align="start">
                        <TextArea
                            value={bookingComment}
                            onChange={setBookingComment}
                            placeholder={t('Напишете пару слов?') as string}
                        />
                        <Button
                            disabled={!bookingComment}
                            style={{ marginLeft: 'auto' }}
                            onClick={onMakeBookingCommentHandler}
                        >
                            {t('Отправить отзыв')}
                        </Button>
                    </VStack>
                )}

                {!booking.isFinished && (
                    <HStack
                        max
                        justify="end"
                    >
                        <Button
                            onMouseEnter={() => setShowDeleteButton(true)}
                            onMouseLeave={() => setShowDeleteButton(false)}
                            onClick={deleteBookingHandler}
                            variant="danger"
                        >
                            <HStack max justify="center" align="center">
                                {showDeleteButton && (
                                    <span>{t('Удалить бронирование')}</span>
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
