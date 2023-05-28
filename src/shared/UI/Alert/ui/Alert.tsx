import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import DangerArrow from 'shared/assets/icons/danger-arrow.svg';
import SuccessArrow from 'shared/assets/icons/success-arrow.svg';
import { Icon } from '../../Icon/Icon';
import { HStack } from '../../Stack';
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
        <HStack
            // align="center"
            // justify="between"
            max
            className={classNames(classes.Alert, {}, [className, typesMapper])}
        >
            {variant === 'danger' && (
                <Icon Svg={DangerArrow} className={classes.icon} />
            )}
            {variant === 'success' && (
                <Icon Svg={SuccessArrow} className={classes.icon} />
            )}
            <p className={classes.message}>{children}</p>
        </HStack>
    );
});
