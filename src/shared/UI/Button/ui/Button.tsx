import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import classes from './Button.module.scss';

type ButtonVariant = 'success' | 'primary' | 'warning' | 'danger' |
    'success-outline' | 'primary-outline' | 'warning-outline' | 'danger-outline'
type ButtonSize = 's' | 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        type = 'button',
        onClick,
        size = 'm',
        variant = 'primary',
        children,
        disabled,
        ...otherProps
    } = props;

    const sizeClasses: Record<ButtonSize, string> = {
        s: classes.s,
        m: classes.m,
        l: classes.l,
        xl: classes.xl,
    };

    const variantClasses: Record<ButtonVariant, string> = {
        primary: classes.primary,
        success: classes.success,
        warning: classes.warning,
        danger: classes.danger,
        'primary-outline': classes['primary-outline'],
        'success-outline': classes['success-outline'],
        'warning-outline': classes['warning-outline'],
        'danger-outline': classes['danger-outline'],
    };

    const classesMapper = [
        className,
        sizeClasses[size],
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
});
