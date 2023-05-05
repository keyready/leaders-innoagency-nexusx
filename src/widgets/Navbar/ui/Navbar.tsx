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
            <Button variant="clear" onClick={() => navigate('/')}>
                <Icon Svg={MainIcon} className={classes.mainIcon} />
            </Button>
            {/* TODO сломалось выравнивание у иконок */}
            <HStack gap="32">
                <AppLink to="#">
                    <HStack max gap="8" align="center">
                        <Icon Svg={EyeIcon} className={classes.icon} />
                        <span className={classes.navbarLinks}>Инклюзивная версия</span>
                    </HStack>
                </AppLink>
                <AppLink to="#">
                    <HStack max gap="8" align="center">
                        <Icon Svg={LkIcon} className={classes.icon} />
                        <span className={classes.navbarLinks}>Личный кабинет</span>
                    </HStack>
                </AppLink>
            </HStack>
        </HStack>
    );
});
