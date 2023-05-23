import { Fragment, ReactNode } from 'react';
import { Listbox as HSelect } from '@headlessui/react';
import { ListBoxDirections } from 'shared/types/ui';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Select.module.scss';

export interface SelectItem {
    value: string;
    content: ReactNode;
    unavailable?: boolean;
}

interface SelectProps {
    className?: string;
    items: SelectItem[];
    selectedValue: SelectItem;
    setSelectedValue: (newValue: SelectItem) => void;
    direction?: ListBoxDirections;
}

const directionsMapper: Record<ListBoxDirections, string> = {
    'bottom left': classes.directionBottomLeft,
    'top left': classes.directionsTopLeft,
    'bottom right': classes.directionBottomRight,
    'top right': classes.directionsTopRight,
};

export const Select = (props: SelectProps) => {
    const {
        className,
        selectedValue,
        setSelectedValue,
        items,
        direction = 'bottom left',
    } = props;

    const menuClasses = [directionsMapper[direction]];

    return (
        <HSelect
            as="div"
            className={classes.Select}
            value={selectedValue}
            onChange={setSelectedValue}
        >
            <HSelect.Button
                className={classes.SelectButton}
            >
                {selectedValue.content}
            </HSelect.Button>
            <HSelect.Options
                className={classNames(classes.SelectOptions, {}, menuClasses)}
            >
                {items.map((item) => (
                    <HSelect.Option
                        as={Fragment}
                        key={item.value}
                        value={item}
                        disabled={item.unavailable}
                    >
                        {({ active, selected }) => (
                            <p
                                className={classNames(classes.item, {
                                    [classes.active]: active,
                                    [classes.selected]: selected,
                                })}
                            >
                                {item.content}
                            </p>
                        )}
                    </HSelect.Option>
                ))}
            </HSelect.Options>
        </HSelect>
    );
};
