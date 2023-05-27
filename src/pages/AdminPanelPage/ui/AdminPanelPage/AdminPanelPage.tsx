import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useState } from 'react';
import { VerticalTabs, VerticalTabsItem } from 'shared/UI/VerticalTabs';
import { UsersList } from '../UsersList';
import classes from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const items: VerticalTabsItem[] = [
    {
        key: 'Список пользователей',
        content: (<UsersList />),
    },
    {
        key: 'Жалобы',
        content: (<p>Контент вкладочки 2</p>),
    },
    {
        key: 'Вкладочка 3',
        content: (<p>Контент вкладочки 3</p>),
    },
    {
        key: 'Вкладочка 4',
        content: (<p>Контент вкладочки 4</p>),
    },
    {
        key: 'Вкладочка 5',
        content: (<p>Контент вкладочки 5</p>),
    },
    {
        key: 'Вкладочка 6',
        content: (<p>Контент вкладочки 6</p>),
    },
];

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const {
        className,
    } = props;

    const [selectedTab, setSelectedTab] = useState<number>(0);

    return (
        <Page className={classNames(classes.AdminPanelPage, {}, [className])}>
            <VerticalTabs
                items={items}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
        </Page>
    );
});

export default AdminPanelPage;
