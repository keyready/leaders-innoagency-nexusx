import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserOwner, logout,
} from 'entities/User';
import { useNavigate } from 'react-router';
import { HStack } from 'shared/UI/Stack';
import MainIcon from 'shared/assets/icons/main-logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { AppLink } from 'shared/UI/AppLink';
import LkIcon from 'shared/assets/icons/lk-icon.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import MapIcon from 'shared/assets/icons/map.svg';
import { Button } from 'shared/UI/Button';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Dropdown } from 'shared/UI/Dropdown';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const userData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isOwner = useSelector(isUserOwner);

    const onLogout = useCallback(() => {
        if (!userData?.refresh_token) {
            return;
        }
        dispatch(logout(userData?.refresh_token));
    }, [dispatch, userData?.refresh_token]);

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
                <AppLink to={RoutePath.map_page}>
                    <HStack max gap="8" align="center">
                        <Icon Svg={MapIcon} className={classes.icon} />
                        <span className={classes.navbarLinks}>{t('Мы на карте')}</span>
                    </HStack>
                </AppLink>
                <AppLink to="#">
                    <HStack max gap="8" align="center">
                        <Icon Svg={EyeIcon} className={classes.icon} />
                        <span className={classes.navbarLinks}>{t('inclusive_ver')}</span>
                    </HStack>
                </AppLink>
                {userData
                    ? (
                        <Dropdown
                            direction="bottom left"
                            trigger={(
                                <HStack max gap="8" align="center">
                                    <Avatar
                                        src={userData.avatar}
                                        size={55}
                                    />
                                    <span className={classes.navbarLinks}>
                                        {`${userData.firstname} ${userData.lastname}`}
                                    </span>
                                </HStack>
                            )}
                            items={[
                                ...(isAdmin
                                    ? [{
                                        content: t('Админка сайта') as string,
                                        href: RoutePath.admin_panel,
                                    }] : []),
                                ...(isOwner
                                    ? [{
                                        content: t('Админка арендодателя') as string,
                                        href: RoutePath.owner_panel,
                                    }] : []),
                                {
                                    content: t('Профиль') as string,
                                    href: RoutePath.profile,
                                },
                                {
                                    content: t('Выйти') as string,
                                    onClick: onLogout,
                                },
                                {
                                    content: (<LanguageSwitcher />),
                                },
                                {
                                    content: (
                                        <ThemeSwitcher />
                                    ),
                                },
                            ]}
                        />
                    )
                    : (
                        <AppLink to="/login">
                            <HStack max gap="8" align="center">
                                <Icon Svg={LkIcon} className={classes.icon} />
                                <span className={classes.navbarLinks}>{t('lk')}</span>
                            </HStack>
                        </AppLink>
                    )}
            </HStack>
        </HStack>
    );
});
