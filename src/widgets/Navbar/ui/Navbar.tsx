import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserOwner, userActions,
} from 'entities/User';
import { useNavigate } from 'react-router';
import { HStack } from 'shared/UI/Stack';
import MainIcon from 'shared/assets/icons/main-logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { AppLink } from 'shared/UI/AppLink';
import LkIcon from 'shared/assets/icons/lk-icon.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Button } from 'shared/UI/Button';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/UI/Select/Select';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const userData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isOwner = useSelector(isUserOwner);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const handleChangeLanguage = useCallback((newLanguage: string) => {
        i18n.changeLanguage(newLanguage);
    }, [i18n]);

    return (
        <HStack
            justify="between"
            align="center"
            className={classNames(classes.Navbar, {}, [className])}
        >
            <Button variant="clear" onClick={() => navigate('/')}>
                <Icon Svg={MainIcon} className={classes.mainIcon} />
            </Button>
            <HStack gap="32">
                <Select
                    value={i18n.language}
                    option={[
                        {
                            value: 'ru',
                            content: t('ru_RU'),
                        },
                        {
                            value: 'en',
                            content: t('en_EN'),
                        },
                        {
                            value: 'es',
                            content: t('es_ES'),
                        },
                    ]}
                    onChange={handleChangeLanguage}
                />
                <AppLink to="#">
                    <HStack max gap="8" align="center">
                        <Icon Svg={EyeIcon} className={classes.icon} />
                        <span className={classes.navbarLinks}>{t('inclusive_ver')}</span>
                    </HStack>
                </AppLink>
                <AppLink to="/login">
                    <HStack max gap="8" align="center">
                        <Icon Svg={LkIcon} className={classes.icon} />
                        <span className={classes.navbarLinks}>{t('lk')}</span>
                    </HStack>
                </AppLink>
            </HStack>
        </HStack>
    );
});
