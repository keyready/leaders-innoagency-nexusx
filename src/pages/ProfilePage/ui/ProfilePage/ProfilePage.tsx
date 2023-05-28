import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Page } from 'widgets/Page/Page';
import { AvatarUploader } from 'widgets/AvatarUploader';
import { HStack, VStack } from 'shared/UI/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { BookingReducer } from 'entities/Booking';
import { useTranslation } from 'react-i18next';
import { UsersList } from 'pages/AdminPanelPage/ui/UsersList';
import { ComplaintsList } from 'pages/AdminPanelPage/ui/ComplaintsList';
import { VerticalTabs } from 'shared/UI/VerticalTabs';
import Cookies from 'js-cookie';
import { PasswordChange } from 'pages/ProfilePage/ui/PasswordChange';
import { EditableProfileData } from '../EditableProfileData';
import { BookingsBlock } from '../BookingsBlock';
import classes from './ProfilePage.module.scss';
import { CommentsBlock } from '../CommentsBlock';

const savedTab: number = Number(Cookies.get('profile-page-tab')) || 0;

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    getBookings: BookingReducer,
};

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;

    const user = useSelector(getUserAuthData);
    const { t } = useTranslation('ProfilePage');

    const [currentTab, setCurrentTab] = useState<number>(savedTab);

    const changeTabHandler = useCallback((tab: number) => {
        Cookies.set('profile-page-tab', String(tab));
        setCurrentTab(tab);
    }, []);

    const profilePageTabs = useMemo(() => [
        {
            key: t('Личные данные') as string,
            content: (
                <HStack max gap="20" align="start">
                    <AvatarUploader image={user?.avatar || ''} />
                    <EditableProfileData />
                </HStack>
            ),
        },
        {
            key: t('Бронирования') as string,
            content: (<BookingsBlock />),
        },
        {
            key: t('Мои комментарии') as string,
            content: (<CommentsBlock />),
        },
        {
            key: t('Настройки') as string,
            content: (<PasswordChange />),
        },
    ], [t, user?.avatar]);

    if (!user) {
        return (
            <Page className={classNames(classes.ProfilePage, {}, [className])}>
                <h3>Не удалось получить информацию о пользователе</h3>
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.ProfilePage, {}, [className])}>
                <VerticalTabs
                    items={profilePageTabs}
                    selectedTab={currentTab}
                    setSelectedTab={changeTabHandler}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
