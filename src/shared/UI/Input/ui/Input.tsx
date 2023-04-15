import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, InputHTMLAttributes, memo, useCallback,
} from 'react';
import classes from './Input.module.scss';

interface InputProps extends Omit<
        InputHTMLAttributes<HTMLInputElement
    >,
    'value' | 'onChange'> {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        onChange,
        value,
        placeholder,
    } = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }, [onChange]);

    return (
        <input
            placeholder={placeholder}
            className={classNames(classes.Input, {}, [className])}
            value={value}
            onChange={onChangeHandler}
        />
    );
});
