import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserOwner, logout, userActions,
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
import { Select, SelectItem } from 'shared/UI/Select/Select';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Dropdown } from 'shared/UI/Dropdown';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const userData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isOwner = useSelector(isUserOwner);

    const onLogout = useCallback(() => {
        if (!userData?.refresh_token) {
            return;
        }
        dispatch(logout(userData?.refresh_token));
    }, [dispatch, userData?.refresh_token]);

    const [selectedLanguage, setSelectedLanguage] = useState<SelectItem>({
        value: i18n.language,
        content: t(i18n.language),
    });
    const handleChangeLanguage = useCallback(async (newLanguage: SelectItem) => {
        console.log(newLanguage);
        await i18n.changeLanguage(newLanguage.value);
        setSelectedLanguage({
            value: i18n.language,
            content: t(i18n.language),
        });
    }, [i18n, t]);

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
                    items={[
                        {
                            value: 'ru',
                            content: t('ru'),
                        },
                        {
                            value: 'en',
                            content: t('en'),
                        },
                        {
                            value: 'es',
                            content: t('es'),
                        },
                    ]}
                    selectedValue={selectedLanguage}
                    setSelectedValue={handleChangeLanguage}
                />
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
