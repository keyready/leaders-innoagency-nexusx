import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Calendar as RCalendar } from 'react-calendar';
import './calendar.scss';
import classes from './Calendar.module.scss';

interface CalendarProps {
    className?: string;
    onChange: (date: any, event: any) => void;
}

export const Calendar = memo((props: CalendarProps) => {
    const {
        className,
        onChange,
    } = props;

    return (
        <div className={classNames('calendarWrapper', {}, [className])}>
            <RCalendar
                onChange={onChange}
            />
        </div>
    );
});
