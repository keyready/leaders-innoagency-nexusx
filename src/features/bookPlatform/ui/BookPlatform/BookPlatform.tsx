import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BookPlatform.module.scss';
import { memo } from 'react';

interface BookPlatformProps {
    className?: string;
}

export const BookPlatform = memo((props: BookPlatformProps) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.BookPlatform, {}, [className])}>
           
        </div>
    );
});