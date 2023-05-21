import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import { useForm } from 'react-hook-form';
import { SelectedTime, Timepicker } from 'widgets/Timepicker';
import { Calendar } from 'widgets/Calendar';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Alert } from 'shared/UI/Alert';
import { useSelector } from 'react-redux';
import { Platform } from 'entities/Platform';
import platformPage from 'pages/PlatformPage/ui/PlatformPage/PlatformPage';
import {
    getBookPlatformError,
    getBookPlatformIsLoading,
    getBookPlatformSuccessMessage,
} from '../../model/selectors/getBookPlatformData';
import { bookPlatform } from '../../model/services/bookPlatform';
import classes from './BookPlatform.module.scss';

interface BookPlatformCardProps {
    className?: string;
    platform?: Platform;
}

export const BookPlatformCard = memo((props: BookPlatformCardProps) => {
    const { className, platform } = props;

    const { t } = useTranslation('PlatformPage');
    const dispatch = useAppDispatch();

    const bookingSuccessMessage = useSelector(getBookPlatformSuccessMessage);
    const bookingError = useSelector(getBookPlatformError);
    const bookingIsProcessing = useSelector(getBookPlatformIsLoading);

    const [selectedDate, setSelectedDate] = useState<Date>('' as unknown as Date);
    const [selectedTime, setSelectedTime] = useState<SelectedTime>({});
    const [bookComment, setBookComment] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [bookedPlaces, setBookedPlaces] = useState<number>(1);

    const bookingSchema = yup.object({
        checkbox: yup.boolean().oneOf(
            [true],
            t('Эта галочка здесь не просто так') as string,
        ),
    }).required();
    const {
        register, handleSubmit, formState: { errors }, watch,
    } = useForm({
        resolver: yupResolver(bookingSchema),
    });

    const placesChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        if (value > 20) setBookedPlaces(20);
        else setBookedPlaces(value);
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        dispatch(bookPlatform({
            platformId: platform?._id,
            date: selectedDate,
            startTime: selectedTime.startTime,
            endTime: selectedTime.finishTime,
            comment: bookComment,
            bookedPlaces,
        }));
    });

    const formatDate = useCallback((date: Date): string => new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        // era: 'long',
    }).format(date), []);
    const formatTimeRange = useCallback(({ startTime, finishTime }: SelectedTime): string => {
        const startHours = startTime?.getHours().toString().padStart(2, '0');
        const startMinutes = startTime?.getMinutes().toString().padStart(2, '0');
        const endHours = finishTime?.getHours().toString().padStart(2, '0');
        const endMinutes = finishTime?.getMinutes().toString().padStart(2, '0');

        return `с ${startHours}:${startMinutes} до ${endHours}:${endMinutes}`;
    }, []);

    return (
        <Card className={classNames(classes.BookPlatform, {}, [className])}>
            <VStack
                className={classes.formWrapper}
                align="center"
                justify="start"
            >
                <h3 className={classes.header}>{t('Забронировать')}</h3>
                {currentStep === 1 && (
                    <Calendar onChange={setSelectedDate} />
                )}

                {currentStep === 2 && (
                    <Timepicker
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                )}

                {currentStep === 3 && (
                    <VStack justify="start" align="center">
                        <h4>{t('Количество мест')}</h4>
                        <input
                            className={classes.input}
                            type="number"
                            value={bookedPlaces}
                            onChange={placesChangeHandler}
                        />
                    </VStack>
                )}

                {currentStep === 4 && (
                    <VStack
                        gap="16"
                        justify="start"
                        align="center"
                        className={classes.feedbackClasses}
                    >
                        <h4>{t('Нужно что-то сказать арендодатору?')}</h4>
                        <TextArea
                            className={classes.textarea}
                            placeholder={t('Ваш комментарий') as string}
                            value={bookComment}
                            onChange={setBookComment}
                        />
                    </VStack>
                )}

                {currentStep === 5 && (
                    <form onSubmit={onSubmit}>
                        <VStack
                            gap="16"
                            justify="start"
                            align="center"
                            className={classes.feedbackClasses}
                        >
                            <h4>{t('Проверьте введенные данные')}</h4>
                            <HStack max>
                                <b>{`${t('Дата')}:`}</b>
                                <p>{`${formatDate(selectedDate)}`}</p>
                            </HStack>
                            <HStack max>
                                <b>{`${t('Время')}:`}</b>
                                <p>{`${formatTimeRange(selectedTime)}`}</p>
                            </HStack>
                            {bookedPlaces && (
                                <HStack gap="8" max justify="start" align="start">
                                    <b>{`${t('Места')}:`}</b>
                                    <p>{bookedPlaces}</p>
                                </HStack>
                            )}
                            {bookComment && (
                                <HStack gap="8" max justify="start" align="start">
                                    <b>{`${t('Комментарий')}:`}</b>
                                    <p style={{ textAlign: 'justify' }}>{bookComment}</p>
                                </HStack>
                            )}

                            <HStack max justify="start">
                                <VStack gap="4" align="center">
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register('checkbox')}
                                            style={{ marginRight: 8 }}
                                        />
                                        {t('Данные введены верно')}
                                    </label>
                                    {errors.checkbox && (
                                        <span
                                            className={classes.errorMessage}
                                        >
                                            {`${errors.checkbox.message}`}
                                        </span>
                                    )}
                                </VStack>
                            </HStack>

                            <VStack gap="8" align="stretch">
                                {bookingError && (
                                    <Alert variant="danger">
                                        {bookingError}
                                    </Alert>
                                )}
                                {bookingSuccessMessage && (
                                    <Alert variant="success">
                                        {bookingSuccessMessage}
                                    </Alert>
                                )}
                                {!bookingSuccessMessage && (
                                    <Button
                                        disabled={!watch('checkbox') || bookingIsProcessing}
                                        type="submit"
                                        variant="primary-outline"
                                    >
                                        {bookingIsProcessing
                                            ? t('В процессе')
                                            : t('Забронировать')}
                                    </Button>
                                )}
                            </VStack>
                        </VStack>
                    </form>
                )}

                {currentStep < 5 && (
                    <Button
                        style={{ width: '50%', marginTop: 20 }}
                        disabled={currentStep === 1
                            ? !selectedDate
                            : !selectedTime.startTime
                            || !selectedTime.finishTime}
                        onClick={() => setCurrentStep(currentStep + 1)}
                    >
                        {t('Далее')}
                    </Button>
                )}
            </VStack>
        </Card>
    );
});
