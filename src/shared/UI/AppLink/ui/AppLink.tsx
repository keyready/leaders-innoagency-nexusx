import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import classes from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
    className?: string
    children?: ReactNode;
    target?: HTMLAttributeAnchorTarget;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        target,
        ...otherProps
    } = props;

    return (
        <Link
            target={target}
            to={to}
            className={classNames(
                classes.AppLink,
                {},
                [className],
            )}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
