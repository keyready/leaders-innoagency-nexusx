import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, memo, TextareaHTMLAttributes, useCallback, useEffect, useRef,
} from 'react';
import classes from './TextArea.module.scss';

type HTMLTextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'placeholder'
>
interface TextAreaProps extends HTMLTextAreaProps {
    className?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export const TextArea = memo((props: TextAreaProps) => {
    const {
        className,
        placeholder,
        value,
        onChange,
        ...otherProps
    } = props;

    const onTextareaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event.target.value);
    }, [onChange]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            {...otherProps}
            className={classNames(classes.TextArea, {}, [className])}
            ref={textareaRef}
            value={value}
            onChange={onTextareaChange}
            placeholder={placeholder}
        >
            {value}
        </textarea>
    );
});
