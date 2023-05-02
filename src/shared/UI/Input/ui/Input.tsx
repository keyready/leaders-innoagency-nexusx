import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, memo, MouseEvent, useCallback, useEffect, useState,
} from 'react';
import CrossIcon from 'shared/assets/icons/input-cross.svg';
import SearchIcon from 'shared/assets/icons/search.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import { HStack } from 'shared/UI/Stack';
import classes from './Input.module.scss';

interface InputProps extends Omit<
        InputHTMLAttributes<HTMLInputElement
    >,
    'value' | 'onChange'> {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    inputType?: 'input' | 'search' | 'password';
    onSubmit?: () => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        onChange,
        value,
        placeholder,
        inputType = 'input',
        onSubmit,
    } = props;

    const [isCrossVisible, setIsCrossVisible] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
        if (value !== '') setIsCrossVisible(true);
        else setIsCrossVisible(false);
    }, [value]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }, [onChange]);

    const onClearButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onChange?.('');
    }, [onChange]);

    const onSubmitClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit?.();
    }, [onSubmit]);

    const passwordVisibilityHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsPasswordVisible((prevState) => !prevState);
    }, []);

    const type = () => {
        if (inputType === 'password' && isPasswordVisible) {
            return 'text';
        }
        if (inputType === 'password' && !isPasswordVisible) {
            return 'password';
        }
        return 'text';
    };

    return (
        <span className={classes.InputWrapper}>
            <input
                placeholder={placeholder}
                className={classNames(classes.Input, {}, [className])}
                value={value}
                onChange={onChangeHandler}
                type={type()}
            />
            {isCrossVisible && (
                <HStack
                    className={classes.btnWrapper}
                    justify="end"
                    align="center"
                >
                    {inputType === 'search' && (
                        <Button
                            variant="clear"
                            onClick={onSubmitClick}
                        >
                            <Icon Svg={SearchIcon} className={classes.icon} />
                        </Button>
                    )}
                    {inputType === 'password' && (
                        <Button
                            variant="clear"
                            onClick={passwordVisibilityHandler}
                        >
                            <Icon Svg={EyeIcon} className={classes.icon} />
                        </Button>
                    )}
                    {inputType !== 'password' && (
                        <Button
                            variant="clear"
                            onClick={onClearButtonClick}
                        >
                            <Icon Svg={CrossIcon} className={classes.icon} />
                        </Button>
                    )}
                </HStack>
            )}
        </span>
    );
});
