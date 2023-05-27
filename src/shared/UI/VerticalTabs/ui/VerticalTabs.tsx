import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, memo, ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import { VStack } from '../../Stack';
import classes from './VerticalTabs.module.scss';

export interface VerticalTabsItem {
    content: ReactNode;
    key: string;
}

interface VerticalTabsProps {
    items: VerticalTabsItem[];
    selectedTab: number;
    setSelectedTab: (tab: number) => void;
}

export const VerticalTabs = memo((props: VerticalTabsProps) => {
    const {
        selectedTab,
        setSelectedTab,
        items,
    } = props;

    return (
        <Tab.Group
            selectedIndex={selectedTab}
            onChange={setSelectedTab}
            vertical
        >
            <div className={classes.TabsWrapper}>
                <Tab.List as={Fragment}>
                    <VStack justify="start" align="center" className={classes.tabsNamesWrapper}>
                        {items.map((item) => (
                            <Tab
                                as={Fragment}
                                key={item.key}
                            >
                                {({ selected }) => (
                                    <h3
                                        className={classNames(classes.tabName, {
                                            [classes.activeTabName]: selected,
                                        })}
                                    >
                                        {item.key}
                                    </h3>
                                )}
                            </Tab>
                        ))}
                    </VStack>
                </Tab.List>
                <Tab.Panels className={classes.panels}>
                    {items.map((item) => (
                        <Tab.Panel
                            key={item.key}
                        >
                            {item.content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </div>
        </Tab.Group>
    );
});
