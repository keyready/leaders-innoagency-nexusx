import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ChangeEvent,
    Fragment, memo, ReactNode, useCallback, useState,
} from 'react';
import { Combobox as HCombobox } from '@headlessui/react';
import { VStack } from '../../Stack';
import classes from './Combobox.module.scss';

interface ComboboxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ComboboxProps {
    className?: string;
    placeholder?: string;
    items: ComboboxItem[];
    onChangeInput?: (value: string) => void;
    onChange: (value: string) => void;
    value: string;
    showLength?: boolean;
}

export const Combobox = memo((props: ComboboxProps) => {
    const {
        className,
        placeholder,
        items,
        value,
        onChange,
        onChangeInput,
        showLength,
    } = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChangeInput?.(e.target.value);
    }, [onChangeInput]);

    return (
        <HCombobox
            as="div"
            className={classNames(classes.Combobox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <HCombobox.Input
                className={classes.input}
                onChange={onChangeHandler}
                placeholder={placeholder}
            />
            <HCombobox.Options
                className={classes.options}
            >
                {placeholder && (
                    <VStack className={classes.placeholderWrapper}>
                        <p className={classes.placeholder}>
                            {placeholder}
                            {showLength ? ` | ${items.length}` : ''}
                        </p>
                        <hr className={classes.divider} />
                    </VStack>
                )}
                {items.length
                    ? items.map((item) => (
                        <HCombobox.Option
                            as={Fragment}
                            key={item.value}
                            value={item.value}
                        >
                            {({ active }) => (
                                <li
                                    className={classNames(classes.item, {
                                        [classes.active]: active,
                                        [classes.disabled]: item.disabled,
                                    })}
                                >
                                    {item.content}
                                </li>
                            )}
                        </HCombobox.Option>
                    ))
                    : (
                        <li
                            className={classNames(classes.item, {}, [])}
                        >
                            Ничего не найдено
                        </li>
                    )}
            </HCombobox.Options>
        </HCombobox>
    );
});
