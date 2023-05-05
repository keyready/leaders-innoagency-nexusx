import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { CostBadges } from 'shared/UI/CostBadges';
import { Badges } from 'shared/UI/Badges';
import { Platform } from '../../model/types/Platform';
import classes from './PlatformCard.module.scss';

interface PlatformProps {
    className?: string;
    platform: Platform;
    type?: 'searchCard' | 'normal'
}

export const PlatformCard = memo((props: PlatformProps) => {
    const { className, platform, type } = props;

    if (type === 'searchCard') {
        return (
            <HStack max gap="32">
                <VStack max>
                    <p className={classes.title}>{platform?.name}</p>
                    <HStack max align="center">
                        <CostBadges type="mt3000" />
                        <Badges type="coworking">Коворкинг</Badges>
                    </HStack>
                </VStack>
                <VStack max>
                    <HStack max>
                        <div className={classes.block} />
                        <p>{platform?.metro}</p>
                    </HStack>
                    <p>{platform?.address}</p>
                </VStack>
            </HStack>
        );
    }

    return (
        <div />
    );
});
