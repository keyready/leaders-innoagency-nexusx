import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Page } from 'widgets/Page/Page';
import { AvatarUploader } from 'widgets/AvatarUploader';
import { EditableProfileData } from 'pages/ProfilePage/ui/EditableProfileData';
import { VStack } from 'shared/UI/Stack';
import classes from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation('ProfilePage');

    const user = useSelector(getUserAuthData);

    return (
        <Page className={classNames(classes.ProfilePage, {}, [className])}>
            <VStack className={classes.ProfilePageWrapper} justify="start" align="center">
                <h2>{`${t('Страница пользователя')} ${user?.firstname}`}</h2>
                <AvatarUploader image={user?.avatar || ''} />
                <EditableProfileData />
            </VStack>
        </Page>
    );
});

export default ProfilePage;
