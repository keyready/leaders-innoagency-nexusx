import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, InputHTMLAttributes, memo, useCallback,
} from 'react';
import classes from './Input.module.scss';

type InputOriginProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'placeholder' | 'value'
>
interface InputProps extends InputOriginProps {
    className?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    plain?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        placeholder,
        value,
        onChange,
        plain,
        ...otherProps
    } = props;

    const ChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    }, [onChange]);

    return (
        <input
            {...otherProps}
            className={classNames(classes.Input, {}, [className])}
            placeholder={placeholder}
            disabled={plain}
            value={value}
            onChange={ChangeHandler}
        />
    );
});
