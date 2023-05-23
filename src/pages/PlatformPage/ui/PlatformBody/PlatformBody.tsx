import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Card } from 'shared/UI/Card/Card';
import { Carousel } from 'widgets/Carousel';
import WaIcon from 'shared/assets/socials/wa.svg';
import TgIcon from 'shared/assets/socials/tg.svg';
import VkIcon from 'shared/assets/socials/vk.svg';
import MetroIcon from 'shared/assets/icons/marker.svg';
import ClockIcon from 'shared/assets/icons/clock.svg';
import BrowserIcon from 'shared/assets/icons/browser.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getPlatformById, getPlatformData, getPlatformIsLoading } from 'entities/Platform';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classes from './PlatformBody.module.scss';

interface PlatformBodyProps {
    className?: string;
    id: string;
}

export const PlatformBody = memo((props: PlatformBodyProps) => {
    const {
        className,
        id,
    } = props;

    const { t } = useTranslation('PlatformPage');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPlatformById(id));
    }, [dispatch, id]);

    const platform = useSelector(getPlatformData);
    const platformIsLoading = useSelector(getPlatformIsLoading);

    const copyOrgEmail = useCallback(() => {
        navigator.clipboard.writeText(platform?.email || '')
            .then(() => alert('Почта скопирована!'));
    }, [platform?.email]);

    if (platformIsLoading) {
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

    // TODO обработка несуществующей платформы
    if (!platform) {
        return (
            <h2>платформа не найдена</h2>
        );
    }

    const platformImages = () => platform?.images.map((image, index) => (
        <img
            key={index}
            className={classes.platformPhoto}
            src={image}
            alt=""
        />
    ));
    const carouselContent = platformImages();

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
                    <Carousel
                        className={classes.carousel}
                        content={carouselContent || []}
                    />
                )}
            </VStack>
            <VStack
                justify="start"
                align="stretch"
                gap="20"
            >
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
                        {platform.web && (
                            <HStack max gap="8">
                                <Icon Svg={BrowserIcon} className={classes.timeIcon} />
                                <a
                                    href={platform?.web}
                                    target="_blank"
                                    className={classes.platformAddress}
                                    rel="noreferrer"
                                >
                                    {platform?.web.split('https://')[1]}
                                </a>
                            </HStack>
                        )}
                        {platform?.date && (
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
                        )}
                    </VStack>
                </Card>
                {platform.owner && (
                    <Card>
                        <VStack align="center" gap="16">
                            <h3 className={classes.orgTitle}>{t('Об организаторе')}</h3>
                            <HStack max justify="center" align="center">
                                <img
                                    src={platform?.owner?.avatar}
                                    alt="фото"
                                    className={classes.orgImage}
                                />
                                <h3 className={classes.orgName}>
                                    {`${platform.owner.lastname} ${platform.owner.firstname}`}
                                </h3>
                            </HStack>
                            <VStack justify="start" align="stretch">
                                <h2 className={classes.orgTel}>{platform?.owner.phoneNumber}</h2>
                                <div
                                    onClick={copyOrgEmail}
                                    className={classes.orgMailWrapper}
                                >
                                    <h2 className={classes.orgEmail}>{platform?.owner.email}</h2>
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
                )}
                <Card>
                    <VStack justify="start" align="center">
                        <h3>{t('Доступно мест')}</h3>
                        <h1>{platform?.maxGuests}</h1>
                    </VStack>
                </Card>
            </VStack>
        </HStack>
    );
});
