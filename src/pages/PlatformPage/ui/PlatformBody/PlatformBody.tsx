import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Platform } from 'entities/Platform';
import { Card } from 'shared/UI/Card/Card';
import { CommentCard } from 'entities/Comment';
import { Carousel } from 'widgets/Carousel';
import WaIcon from 'shared/assets/socials/wa.svg';
import TgIcon from 'shared/assets/socials/tg.svg';
import VkIcon from 'shared/assets/socials/vk.svg';
import MetroIcon from 'shared/assets/icons/marker.svg';
import ClockIcon from 'shared/assets/icons/clock.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classes from './PlatformBody.module.scss';

interface PlatformBodyProps {
    className?: string;
    platform?: Platform;
    isLoading?: boolean;
}

export const PlatformBody = memo((props: PlatformBodyProps) => {
    const {
        className,
        platform,
        isLoading,
    } = props;

    const { t } = useTranslation('PlatformPage');

    const copyOrgEmail = useCallback(() => {
        navigator.clipboard.writeText(platform?.email || '')
            .then(() => alert('Почта скопирована!'));
    }, [platform?.email]);

    if (isLoading) {
        return (
            <HStack max justify="between" align="start" gap="20">
                <VStack
                    className={classes.mainWrapper}
                    gap="16"
                >
                    {new Array(20)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} width="100%" height={12} border="5px" />
                        ))}
                    <Skeleton width={690} height={440} border="10px" />
                </VStack>
                <VStack align="start" justify="center" gap="20">
                    <Skeleton
                        width={350}
                        height={100}
                        border="35px"
                    />
                    <Skeleton
                        width={350}
                        height={270}
                        border="35px"
                    />
                    <Skeleton
                        width={350}
                        height={370}
                        border="35px"
                    />
                </VStack>
            </HStack>
        );
    }

    return (
        <HStack
            max
            justify="between"
            align="start"
            className={classNames(classes.PlatformBody, {}, [className])}
            gap="20"
        >
            <VStack
                className={classes.mainWrapper}
            >
                <p className={classes.platformDescription}>
                    {platform?.description}
                </p>
                {platform?.images && (
                    <Carousel className={classes.carousel} images={platform?.images} />
                )}
            </VStack>
            <VStack justify="start" align="stretch" gap="20">
                <Card>
                    <VStack align="start" justify="center">
                        <HStack max gap="8">
                            <Icon Svg={MetroIcon} className={classes.timeIcon} />
                            <p
                                className={classes.platformAddress}
                            >
                                {platform?.address}
                            </p>
                        </HStack>
                        <HStack max gap="8">
                            <Icon Svg={ClockIcon} className={classes.timeIcon} />
                            <p
                                className={classes.platformAddress}
                            >
                                {platform?.date.toLocaleString('ru-RU', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: false,
                                })}
                            </p>
                        </HStack>
                    </VStack>
                </Card>
                <Card>
                    <VStack align="center" gap="16">
                        <h3 className={classes.orgTitle}>{t('Об организаторе')}</h3>
                        <HStack max justify="center" align="center">
                            <img
                                src="фото_организатора"
                                alt="фото"
                                className={classes.orgImage}
                            />
                            <h3 className={classes.orgName}>Котяткинс Котовичевичкин</h3>
                        </HStack>
                        <VStack>
                            <h2 className={classes.orgTel}>{platform?.tel}</h2>
                            <div
                                onClick={copyOrgEmail}
                                className={classes.orgMailWrapper}
                            >
                                <h2 className={classes.orgEmail}>{platform?.email}</h2>
                            </div>
                        </VStack>
                        <HStack
                            max
                            justify="center"
                            gap="8"
                        >
                            <a
                                target="_blank"
                                href={`//${platform?.whatsapp}` || ''}
                                rel="noreferrer"
                            >
                                <Icon Svg={WaIcon} className={classes.refIcon} />
                            </a>
                            <a
                                target="_blank"
                                href={`//${platform?.telegram}` || ''}
                                rel="noreferrer"
                            >
                                <Icon Svg={TgIcon} className={classes.refIcon} />
                            </a>
                            <a
                                target="_blank"
                                href={`//${platform?.vkontakte}` || ''}
                                rel="noreferrer"
                            >
                                <Icon Svg={VkIcon} className={classes.refIcon} />
                            </a>
                        </HStack>
                    </VStack>
                </Card>
                <CommentCard
                    header
                    platformId={platform?._id}
                />
            </VStack>
        </HStack>
    );
});
