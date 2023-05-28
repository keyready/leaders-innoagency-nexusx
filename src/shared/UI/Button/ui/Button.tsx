import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import classes from './Button.module.scss';

type ButtonVariant = 'primary' | 'primary-outline' | 'clear' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    // size?: ButtonSize;
    children?: ReactNode;
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        type = 'button',
        onClick,
        // size = 'm',
        variant = 'primary',
        children,
        disabled,
        ...otherProps
    } = props;
    //
    // const sizeClasses: Record<ButtonSize, string> = {
    //     s: classes.s,
    //     m: classes.m,
    //     l: classes.l,
    //     xl: classes.xl,
    // };

    const variantClasses: Record<ButtonVariant, string> = {
        primary: classes.primary,
        'primary-outline': classes['primary-outline'],
        clear: classes.clear,
        danger: classes.danger,
    };

    const classesMapper = [
        className,
        // sizeClasses[size],
        variantClasses[variant],
    ];
    const mods: Mods = {
        [classes.disabled]: disabled,
    };

    return (
        <button
            className={classNames(classes.Button, mods, classesMapper)}
            disabled={disabled}
            type={type}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </button>
    );
};
