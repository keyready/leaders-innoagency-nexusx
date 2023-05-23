import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import classes from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.AdminPanelPage, {}, [className])}>
            <h1>Страница админа сайта</h1>
        </Page>
    );
});

export default AdminPanelPage;
