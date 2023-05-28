import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Page } from 'widgets/Page/Page';
import { AvatarUploader } from 'widgets/AvatarUploader';
import { HStack, VStack } from 'shared/UI/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { BookingReducer } from 'entities/Booking';
import { EditableProfileData } from '../EditableProfileData';
import { BookingsBlock } from '../BookingsBlock';
import classes from './ProfilePage.module.scss';
import { CommentsBlock } from '../CommentsBlock';

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    getBookings: BookingReducer,
};

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;

    const user = useSelector(getUserAuthData);

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
                <VStack
                    className={classes.ProfilePageWrapper}
                    justify="start"
                    align="center"
                >
                    <HStack
                        max
                        justify="between"
                        align="stretch"
                    >
                        <AvatarUploader image={user?.avatar || ''} />
                        <EditableProfileData />
                    </HStack>
                    <BookingsBlock />
                    <CommentsBlock />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
