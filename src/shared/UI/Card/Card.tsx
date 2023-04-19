import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import classes from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    invisible?: boolean
    theme?: CardTheme
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        invisible,
        ...otherProps
    } = props;

    return (
        <div
            className={classNames(classes.Card, {
                [classes.invisible]: invisible,
            }, [className, classes[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
