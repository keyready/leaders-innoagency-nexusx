import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { HStack, VStack } from 'shared/UI/Stack';
import { BookingCard } from 'entities/Booking';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { Carousel } from 'widgets/Carousel';
import { useOwnersPlatformListQuery } from '../../../api/ownersPlatformsListApi';
import classes from './CheckBookings.module.scss';

interface CheckBookingsProps {
    className?: string;
}

export const CheckBookings = memo((props: CheckBookingsProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    const user = useSelector(getUserAuthData);

    const {
        isFetching, isLoading, data: bookings, error,
    } = useOwnersPlatformListQuery(user?._id || '');

    if (!bookings) {
        return (
            <HStack max>
                <p>{t('Пока бронирований нет')}</p>
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack max>
                <p>{t('Произошла какая-то ошибка')}</p>
            </HStack>
        );
    }

    const bookingsCarousel = () => bookings
        .map((booking, index) => (
            <BookingCard
                key={index}
                booking={booking}
                isOwnerLooking
            />
        ));
    const finishedCarouselContent = bookingsCarousel();

    if (isLoading || isFetching) {
        return (
            <VStack max justify="start" align="stretch" gap="16">
                {new Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} width="100%" height={50} border="20px" />
                    ))}
            </VStack>
        );
    }

    return (
        <div className={classNames(classes.CheckBookings, {}, [className])}>
            <Carousel content={finishedCarouselContent} />
        </div>
    );
});
