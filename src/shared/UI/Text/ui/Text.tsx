import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo } from 'react';
import classes from './Text.module.scss';

export enum TextTheme {
    PRIMARY ='primary',
    INVERTED = 'inverted',
    ERROR = 'error'
}

export enum TextAlign {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l'
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    indent?: string | number;
    theme?: TextTheme;
    align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        indent,
    } = props;

    const add = [
        className,
        classes[theme],
        classes[align],
    ];

    const styles: CSSProperties = {
        textIndent: indent,
    };

    return (
        <div
            className={classNames(classes.Text, {}, add)}
            style={styles}
        >
            {title && <h3 className={classes.title}>{title}</h3>}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    );
});
