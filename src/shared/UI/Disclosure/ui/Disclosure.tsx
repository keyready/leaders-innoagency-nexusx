/**
    "офис хуефис"
    "арена хуена"
    "тут курильщики играют, там - наркоманы"
    п/п-к Дудкин А.С. 11:25 19.04.2023
*/

import { memo, ReactNode } from 'react';
import { Disclosure as HDisclosure, Transition } from '@headlessui/react';
import ExpandArrow from 'shared/assets/icons/expand_arrow.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../../Button';
import { Card } from '../../Card/Card';
import classes from './Disclosure.module.scss';

export interface DisclosureItems {
    title: string;
    content: ReactNode;
}

interface DisclosureProps {
    className?: string;
    items: DisclosureItems[];
    isGrid?: boolean
}

export const Disclosure = memo((props: DisclosureProps) => {
    const {
        className,
        items,
    } = props;

    return (
        <>
            {items
                ? items.map((item) => (
                    <HDisclosure
                        key={item.title}
                        as="div"
                        className={classNames(classes.Disclosure, {}, [className])}
                    >
                        {({ open }) => (
                            <>
                                <HDisclosure.Button
                                    className={classes.button}
                                    as={Button}
                                >
                                    {item.title}
                                    <ExpandArrow
                                        className={classNames(
                                            classes.arrow,
                                            { [classes.opened]: open },
                                            [],
                                        )}
                                    />
                                </HDisclosure.Button>
                                <Transition
                                    enter={classes.enter}
                                    enterFrom={classes.enterFrom}
                                    enterTo={classes.enterTo}
                                    leave={classes.leave}
                                    leaveFrom={classes.leaveFrom}
                                    leaveTo={classes.leaveTo}
                                >
                                    <HDisclosure.Panel
                                        as={Card}
                                        className={classes.panel}
                                    >
                                        {item.content}
                                    </HDisclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </HDisclosure>
                ))
                : ''}
        </>
    );
});
