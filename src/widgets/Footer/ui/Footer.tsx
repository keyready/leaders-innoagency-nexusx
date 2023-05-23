import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import classes from './Footer.module.scss';

interface FooterProps {
    className?: string;
}

export const Footer = memo((props: FooterProps) => {
    const {
        className,
    } = props;

    return (
        <VStack className={classNames(classes.Footer, {}, [className])}>
            <h1>Тут будет самый крутой подвал, который только когда-либо был создан</h1>
        </VStack>
    );
});
