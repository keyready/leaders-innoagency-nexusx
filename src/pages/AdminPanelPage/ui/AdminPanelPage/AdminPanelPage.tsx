import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useState } from 'react';
import { VerticalTabs } from 'shared/UI/VerticalTabs';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ComplaintReducer } from 'entities/Complaint';
import { UsersList } from '../UsersList';
import classes from './AdminPanelPage.module.scss';
import { ComplaintsList } from '../ComplaintsList';

interface AdminPanelPageProps {
    className?: string;
}

const reducers: ReducersList = {
    complaint: ComplaintReducer,
};

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const {
        className,
    } = props;

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [usersPage, setUsersPage] = useState<number>(1);
    const [complaintsPage, setComplaintsPage] = useState<number>(1);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.AdminPanelPage, {}, [className])}>
                <VerticalTabs
                    items={[
                        {
                            key: 'Список пользователей',
                            content: (
                                <UsersList
                                    page={usersPage}
                                    setPage={setUsersPage}
                                />
                            ),
                        },
                        {
                            key: 'Жалобы',
                            content: (
                                <ComplaintsList
                                    page={complaintsPage}
                                    setPage={setComplaintsPage}
                                />
                            ),
                        }]}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default AdminPanelPage;
