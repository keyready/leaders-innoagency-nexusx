import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import { useForm } from 'react-hook-form';
import { Input } from 'shared/UI/Input';
import { Timepicker } from 'widgets/Timepicker';
import { Calendar } from 'widgets/Calendar';
import { VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import classes from './BookPlatform.module.scss';

interface BookPlatformCardProps {
    className?: string;
}

export const BookPlatformCard = memo((props: BookPlatformCardProps) => {
    const { className } = props;

    const { t } = useTranslation('PlatformPage');

    const [selectedDate, setSelectedDate] = useState<Date>('' as unknown as Date);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const {
        handleSubmit, setValue, watch, register, formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((data) => {

    });

    return (
        <Card className={classNames(classes.BookPlatform, {}, [className])}>
            <VStack align="center" justify="start">
                <h3 className={classes.header}>{t('Забронировать')}</h3>
                {currentStep === 1 && (
                    <>
                        <Calendar onChange={setSelectedDate} />
                        <Button
                            style={{ width: '100%' }}
                            disabled={!selectedDate}
                            onClick={() => setCurrentStep((prevState) => prevState + 1)}
                        >
                            Далее
                        </Button>
                    </>
                )}

                {currentStep === 2 && (
                    <p>Выбор времени брони</p>
                )}
            </VStack>
        </Card>
    );
});
