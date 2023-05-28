import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { CostBadges } from 'shared/UI/CostBadges';
import { Badges } from 'shared/UI/Badges';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import MarkerIcon from 'shared/assets/icons/marker.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { formatDate } from 'entities/Booking';
import { Platform } from '../../model/types/Platform';
import classes from './PlatformCard.module.scss';

interface PlatformProps {
    className?: string;
    platform: Platform;
    type?: 'searchCard' | 'normal';
    isLoading?: boolean;
}

export const PlatformCard = memo((props: PlatformProps) => {
    const {
        className, platform, type, isLoading,
    } = props;

    if (isLoading) {
        return (
            <HStack max gap="32" className={classes.PlatformCardSearch}>
                <VStack max>
                    <Skeleton width="100%" height={20} />
                </VStack>
                <VStack max>
                    <HStack max>
                        <div className={classes.block} />
                        <Skeleton width="100%" height={20} />
                    </HStack>
                    <Skeleton width="100%" height={20} />
                </VStack>
            </HStack>
        );
    }

    if (type === 'searchCard') {
        return (
            <HStack max gap="32" className={classes.PlatformCardSearch}>
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
        <HStack max gap="32" className={classes.PlatformCard} justify="stretch">
            <VStack
                justify="between"
                align="start"
                max
                gap="32"
                className={classes.infoWrapper}
            >
                <VStack max>
                    <h1 className={classes.title}>{platform?.name}</h1>
                    <p className={classes.subtitle}>{platform?.subtitle}</p>
                </VStack>
                <HStack max>
                    <Icon Svg={MarkerIcon} className={classes.icon} />
                    <p className={classes.address}>{platform.address}</p>
                </HStack>
            </VStack>
            <img
                className={classes.image}
                src={platform.images[0]}
                alt={platform.name}
            />
        </HStack>
    );
});
