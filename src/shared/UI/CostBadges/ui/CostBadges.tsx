import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './CostBadges.module.scss';

export type CostTypesBadges =
    'mt3000' | 'lt3000' |
    'met3000' | 'let3000' |
    'free'

const TypesClasses: Record<CostTypesBadges, string> = {
    mt3000: classes.mt3000,
    lt3000: classes.lt3000,
    met3000: classes.met3000,
    let3000: classes.let3000,
    free: classes.free,
};

interface CostBadgesProps {
    className?: string;
    type?: CostTypesBadges;
}

export const CostBadges = memo((props: CostBadgesProps) => {
    const {
        type = 'free',
    } = props;

    return (
        <div className={classNames(classes.CostBadges, {})}>
            <p className={TypesClasses[type]}>
                {type === 'mt3000' && '₽ >3 000'}
                {type === 'lt3000' && '₽ <3 000'}
                {type === 'let3000' && '₽ ≤3 000'}
                {type === 'met3000' && '₽ ≥3 000'}
                {type === 'free' && 'Бесплатно'}
            </p>
        </div>
    );
});
