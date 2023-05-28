import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { VerticalTabs, VerticalTabsItem } from 'shared/UI/VerticalTabs';
import Cookies from 'js-cookie';
import classes from './OwnerPanelPage.module.scss';
import { CreatePlatform } from '../CreatePlatform';
import { CheckBookings } from '../CheckBookings';

const rootTab: number = Number(Cookies.get('owner-page-tab')) || 0;

interface OwnerPanelPageProps {
    className?: string;
}

const reducers: ReducersList = {

};

const OwnerPanelPage = memo((props: OwnerPanelPageProps) => {
    const { className } = props;

    const { t } = useTranslation('OwnerPage');

    const [selectedTab, setSelectedTab] = useState<number>(rootTab);

    const setSelectedTabHandler = useCallback((tab: number) => {
        Cookies.set('owner-page-tab', String(tab));
        setSelectedTab(tab);
    }, []);

    const ownersTabs: VerticalTabsItem[] = useMemo(() => [
        {
            key: t('Создание платформы') as string,
            content: (<CreatePlatform />),
        },
        {
            key: t('Просмотр бронирований') as string,
            content: (<CheckBookings />),
        },
    ], [t]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.OwnerPanelPage, {}, [className])}>
                <VerticalTabs
                    items={ownersTabs}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTabHandler}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default OwnerPanelPage;
