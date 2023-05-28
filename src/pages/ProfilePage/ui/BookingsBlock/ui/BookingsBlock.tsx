import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBookings, getBookingsIsLoading } from 'features/getBookings';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchBookingsByUserId } from 'features/getBookings/model/services/fetchBookingsByUserId';
import { getUserAuthData } from 'entities/User';
import { BookingCard } from 'entities/Booking';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { Carousel } from 'widgets/Carousel';
import { Card } from 'shared/UI/Card/Card';
import { TabContent, Tabs } from 'shared/UI/Tabs';
import classes from './BookingsBlock.module.scss';

interface BookingsBlockProps {
    className?: string;
}
export const BookingsBlock = memo((props: BookingsBlockProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const { t } = useTranslation('ProfilePage');

    const bookings = useSelector(getBookings.selectAll);
    const bookingsIsLoading = useSelector(getBookingsIsLoading);
    const user = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(fetchBookingsByUserId(user?._id));
    }, [dispatch, user?._id]);

    if (bookingsIsLoading) {
        return (<Skeleton width="100%" height={200} />);
    }

    if (!bookings.length) {
        return (
            <Card>
                <h3>{t('У Вас пока нет бронирований')}</h3>
            </Card>
        );
    }

    const actualBookingsCarousel = () => bookings
        .filter((booking) => !booking.isFinished)
        .map((booking, index) => (
            <BookingCard
                key={index}
                booking={booking}
            />
        ));
    const actualCarouselContent = actualBookingsCarousel();

    const finishedBookingsCarousel = () => bookings
        .filter((booking) => booking.isFinished)
        .map((booking, index) => (
            <BookingCard
                key={index}
                booking={booking}
            />
        ));
    const finishedCarouselContent = finishedBookingsCarousel();

    const tabsContent: TabContent[] = [
        {
            title: t('Будущие') as string,
            content: (<Carousel content={actualCarouselContent} />),
        },
        {
            title: t('Завершенные') as string,
            content: (<Carousel content={finishedCarouselContent} />),
        },
    ];

    return (
        <div className={classNames(classes.BookingsBlock, {}, [className])}>
            <Tabs content={tabsContent} />
        </div>
    );
});
