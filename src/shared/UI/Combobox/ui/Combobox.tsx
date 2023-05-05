import { classNames } from 'shared/lib/classNames/classNames';
import React, { Fragment, memo, ReactNode } from 'react';
import { Combobox as HCombobox } from '@headlessui/react';
import classes from './Combobox.module.scss';

export interface ComboboxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ComboboxProps {
    className?: string;
    placeholder?: string;
    items: ComboboxItem[];
    selectedPerson: ComboboxItem;
    setSelectedPerson: (item: ComboboxItem) => void;
    query: string;
    setQuery: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onResultsClick?: () => void;
}

export const Combobox = memo((props: ComboboxProps) => {
    const {
        items,
        placeholder,
        onResultsClick,
        className,
        selectedPerson,
        setSelectedPerson,
        query,
        setQuery,
        onFocus,
        onBlur,
    } = props;

    const filteredPeople = query === ''
        ? items
        : items.filter((
            item,
        ) => item.value.toLowerCase().includes(query.toLowerCase()));

    return (
        <HCombobox
            as="div"
            className={classes.Combobox}
            value={selectedPerson}
            onChange={(value) => setSelectedPerson(value)}
        >
            <HCombobox.Input
                className={classNames(classes.Input, {}, [className])}
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(item: ComboboxItem) => item.value}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {filteredPeople
                ? (
                    <HCombobox.Options
                        className={classes.options}
                    >
                        {filteredPeople.map((item) => (
                            <HCombobox.Option
                                as={Fragment}
                                key={item.value}
                                value={item}
                                disabled={item.disabled}
                            >
                                {({ active }) => (
                                    <p className={classNames(
                                        classes.item,
                                        { [classes.active]: active },
                                    )}
                                    >
                                        {item.content}
                                    </p>
                                )}
                            </HCombobox.Option>
                        ))}
                        {filteredPeople.length ? (<hr className={classes.divider} />) : ''}
                        <HCombobox.Option
                            value="Посмотреть все результаты"
                            onClick={onResultsClick}
                        >
                            {({ active }) => (
                                <p className={classNames(
                                    classes.item,
                                    { [classes.active]: active },
                                    [classes.search],
                                )}
                                >
                                    Посмотреть все результаты
                                </p>
                            )}
                        </HCombobox.Option>
                    </HCombobox.Options>
                )
                : (<p>Ничего не найдено..</p>)}
        </HCombobox>
    );
});
