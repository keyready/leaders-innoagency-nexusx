import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Badges.module.scss';

export type BadgesTypes =
    'coworking' | 'gallery' |
    'event' | 'mc' |
    'lecture' | 'festival' |
    'film'

const TypesClasses: Record<BadgesTypes, string> = {
    coworking: classes.coworking,
    gallery: classes.gallery,
    event: classes.event,
    mc: classes.mc,
    lecture: classes.lecture,
    festival: classes.festival,
    film: classes.film,
};

interface BadgesProps {
    className?: string;
    type?: BadgesTypes;
    children?: string
}

export const Badges = memo((props: BadgesProps) => {
    const {
        className,
        children,
        type = 'coworking',
    } = props;

    const add = [
        TypesClasses[type],
        className,
    ];

    return (
        <p className={classNames(classes.Badges, {}, add)}>
            {children}
        </p>
    );
});
