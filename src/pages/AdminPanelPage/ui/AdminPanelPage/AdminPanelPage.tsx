import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { VerticalTabs } from 'shared/UI/VerticalTabs';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ComplaintReducer } from 'entities/Complaint';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { UsersList } from '../UsersList';
import classes from './AdminPanelPage.module.scss';
import { ComplaintsList } from '../ComplaintsList';

const savedTab: number = Number(Cookies.get('admin-page-tab')) || 0;

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

    const { t } = useTranslation('AdminPanelPage');

    const [selectedTab, setSelectedTab] = useState<number>(savedTab);
    const [usersPage, setUsersPage] = useState<number>(1);
    const [complaintsPage, setComplaintsPage] = useState<number>(1);

    const changeTabHandler = useCallback((tab: number) => {
        Cookies.set('admin-page-tab', String(tab));
        setSelectedTab(tab);
    }, []);

    const adminPageTabs = useMemo(() => [
        {
            key: t('Список пользователей') as string,
            content: (
                <UsersList
                    page={usersPage}
                    setPage={setUsersPage}
                />
            ),
        },
        {
            key: t('Жалобы') as string,
            content: (
                <ComplaintsList
                    page={complaintsPage}
                    setPage={setComplaintsPage}
                />
            ),
        }], [t, complaintsPage, usersPage]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.AdminPanelPage, {}, [className])}>
                <VerticalTabs
                    items={adminPageTabs}
                    selectedTab={selectedTab}
                    setSelectedTab={changeTabHandler}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default AdminPanelPage;
