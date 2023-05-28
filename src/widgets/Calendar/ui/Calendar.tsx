import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Calendar as RCalendar } from 'react-calendar';
import './calendar.scss';

interface CalendarProps {
    className?: string;
    onChange: (date: any, event: any) => void;
}

export const Calendar = memo((props: CalendarProps) => {
    const {
        className,
        onChange,
    } = props;

    const isBeforeToday = (date: Date) => date < new Date();

    return (
        <div className={classNames('calendarWrapper', {}, [className])}>
            <RCalendar
                tileClassName={({ date }) => (isBeforeToday(date) ? 'unavailable-day' : null)}
                onChange={onChange}
                tileDisabled={({ date }) => isBeforeToday(date)}
            />
        </div>
    );
});
