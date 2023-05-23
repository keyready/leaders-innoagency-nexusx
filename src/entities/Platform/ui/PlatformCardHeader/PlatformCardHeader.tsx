import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { CostBadges, CostTypesBadges } from 'shared/UI/CostBadges';
import { Badges, BadgesTypes } from 'shared/UI/Badges';
import classes from './PlatformCardHeader.module.scss';

interface PlatformCardHeaderProps {
    className?: string;
    cost: CostTypesBadges;
    type: BadgesTypes;
    typeName: string;
}

export const PlatformCardHeader = memo((props: PlatformCardHeaderProps) => {
    const {
        className,
        cost,
        type,
        typeName,
    } = props;

    return (
        <HStack
            max
            gap="32"
            align="center"
            justify="start"
            className={classNames(classes.PlatformCardHeader, {}, [className])}
        >
            <CostBadges type={cost} />
            <Badges type={type}>{typeName}</Badges>
        </HStack>
    );
});
