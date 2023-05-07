import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import classes from './Alert.module.scss';

type AlertType = 'primary' | 'success' | 'danger' | 'warning'
interface AlertProps {
    className?: string;
    variant?: AlertType;
    children?: ReactNode
}

export const Alert = memo((props: AlertProps) => {
    const {
        className,
        children,
        variant = 'primary',
    } = props;

    const typesClasses: Record<AlertType, string> = {
        primary: classes.primary,
        success: classes.success,
        warning: classes.warning,
        danger: classes.danger,
    };

    const typesMapper = typesClasses[variant];

    return (
        <div className={classNames(classes.Alert, {}, [className, typesMapper])}>
            {children}
        </div>
    );
});
