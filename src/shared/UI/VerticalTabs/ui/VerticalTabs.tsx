import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Tab } from '@headlessui/react';
import classes from './VerticalTabs.module.scss';

interface VerticalTabsProps {
    className?: string;
}

export const VerticalTabs = memo((props: VerticalTabsProps) => {
    const {
        className,
    } = props;

    return (
        <Tab.Group vertical>
            <Tab.List>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>Content 1</Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
});
