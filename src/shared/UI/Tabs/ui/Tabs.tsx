import { classNames } from 'shared/lib/classNames/classNames';
import {
    Fragment, memo, ReactNode, useCallback, useState,
} from 'react';
import { Tab } from '@headlessui/react';
import { HStack } from 'shared/UI/Stack';
import classes from './Tabs.module.scss';

export interface TabContent {
    title: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    content: TabContent[];
    onChangeTrigger?: () => void;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        content,
        onChangeTrigger,
    } = props;

    const [currentTab, setCurrentTab] = useState<number>(0);

    const setTabHandler = useCallback((value: number) => {
        setCurrentTab(value);
        onChangeTrigger?.();
    }, [onChangeTrigger]);

    return (
        <Tab.Group selectedIndex={currentTab} onChange={setTabHandler}>
            <Tab.List
                as={HStack}
                max
                justify="center"
                align="center"
                className={classNames(classes.Tabs, {}, [className])}
            >
                {content.map((item) => (
                    <Tab as={Fragment} key={item.title}>
                        {({ selected }) => (
                            <button className={classNames(classes.Tab, {
                                [classes.selected]: selected,
                            })}
                            >
                                {item.title}
                            </button>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className={classes.TabsContentList}>
                {content.map((item) => (
                    <Tab.Panel
                        key={item.title}
                        className={classes.TabsContent}
                    >
                        {item.content}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
});
