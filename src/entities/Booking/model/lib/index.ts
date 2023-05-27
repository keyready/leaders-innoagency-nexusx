import { SelectedTime } from 'widgets/Timepicker';

export const formatDate = (date: Date): string => new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    // era: 'long',
}).format(date);

export const formatTimeRange = ({ startTime, finishTime }: SelectedTime): string => {
    const startHours = startTime?.getHours().toString().padStart(2, '0');
    const startMinutes = startTime?.getMinutes().toString().padStart(2, '0');
    const endHours = finishTime?.getHours().toString().padStart(2, '0');
    const endMinutes = finishTime?.getMinutes().toString().padStart(2, '0');

    return `с ${startHours}:${startMinutes} до ${endHours}:${endMinutes}`;
};
