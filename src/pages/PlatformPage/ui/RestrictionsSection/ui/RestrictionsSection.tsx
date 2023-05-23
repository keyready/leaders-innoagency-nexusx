import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { getPlatformData, getPlatformIsLoading, Platform } from 'entities/Platform';
import { HStack, VStack } from 'shared/UI/Stack';
import { Card } from 'shared/UI/Card/Card';
import { Icon } from 'shared/UI/Icon/Icon';
import CrossIcon from 'shared/assets/icons/danger-arrow.svg';
import { useSelector } from 'react-redux';
import classes from './RestrictionsSection.module.scss';

interface RestrictionsSectionProps {
    className?: string;
}

export const RestrictionsSection = memo((props: RestrictionsSectionProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('PlatformPage');

    const platform = useSelector(getPlatformData);
    const platformIsLoading = useSelector(getPlatformIsLoading);

    return (
        <VStack
            className={classes.RestrictionsSection}
            justify="start"
            align="center"
        >
            <h2 style={{ textAlign: 'center' }}>{t('Условия аренды')}</h2>
            <div className={classes.restrictions}>
                {platform?.restrictions.map((restriction, index) => (
                    <Card key={index}>
                        <HStack max justify="start" align="center">
                            <Icon className={classes.icon} Svg={CrossIcon} />
                            <p>{restriction}</p>
                        </HStack>
                    </Card>
                ))}
            </div>
        </VStack>
    );
});
