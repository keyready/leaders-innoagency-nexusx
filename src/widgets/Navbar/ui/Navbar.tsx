import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserOwner, userActions,
} from 'entities/User';
import { HStack } from 'shared/UI/Stack';
import MainIcon from 'shared/assets/icons/main-logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { AppLink } from 'shared/UI/AppLink';
import LkIcon from 'shared/assets/icons/lk-icon.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const userData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isOwner = useSelector(isUserOwner);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <HStack
            justify="between"
            align="center"
            className={classNames(classes.Navbar, {}, [className])}
        >
            <Icon Svg={MainIcon} className={classes.mainIcon} />
            <HStack className={classes.navbarLinks} gap="32">
                <AppLink to="#" className={classes.navbarLinks}>
                    <Icon Svg={EyeIcon} className={classes.icon} />
                    Инклюзивная версия
                </AppLink>
                <AppLink to="#" className={classes.navbarLinks}>
                    <Icon Svg={LkIcon} className={classes.icon} />
                    Личный кабинет
                </AppLink>
            </HStack>
        </HStack>
    );
});
