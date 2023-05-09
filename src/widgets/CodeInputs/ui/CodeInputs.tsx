import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import BackspaceIcon from 'shared/assets/icons/backspace.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import classes from './CodeInputs.module.scss';

interface CodeInputsProps {
    className?: string;
    getCode: (code: string) => void;
}

export const CodeInputs = memo((props: CodeInputsProps) => {
    const {
        className,
        getCode,
    } = props;

    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newCode = [...code];
        newCode[index] = event.target.value.trim().substr(0, 1);
        setCode(newCode);

        if (index < inputRefs.length - 1 && newCode[index] !== '') {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enteredCode = code.join('');
        getCode(enteredCode);
    };

    const handleDeleteLastChar = useCallback(() => {
        const newCode = [...code];
        const lastChar: number = newCode.indexOf('');

        if (lastChar === -1) {
            newCode[3] = '';
            inputRefs[3].current?.focus();
        } else if (lastChar === 0) {
            inputRefs[0].current?.focus();
        } else {
            newCode[lastChar - 1] = '';
            inputRefs[lastChar - 1].current?.focus();
        }

        setCode(newCode);
    }, [code, inputRefs]);

    useEffect(() => {
        const handleKeyDown = (key: KeyboardEvent) => {
            if (key.key === 'Backspace') {
                handleDeleteLastChar();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleDeleteLastChar]);

    useEffect(() => {
        if (code.every((char) => char !== '')) {
            const enteredCode = code.join('');
            getCode(enteredCode);
        }
    }, [code, getCode]);

    return (
        <form
            onSubmit={handleSubmit}
            className={classNames(classes.CodeInputs, {}, [className])}
        >
            <input
                className={classes.input}
                type="text"
                value={code[0]}
                onChange={(event) => handleInputChange(event, 0)}
                maxLength={1}
                ref={inputRefs[0]}
            />
            <input
                className={classes.input}
                type="text"
                value={code[1]}
                onChange={(event) => handleInputChange(event, 1)}
                maxLength={1}
                ref={inputRefs[1]}
            />
            <input
                className={classes.input}
                type="text"
                value={code[2]}
                onChange={(event) => handleInputChange(event, 2)}
                maxLength={1}
                ref={inputRefs[2]}
            />
            <input
                className={classes.input}
                type="text"
                value={code[3]}
                onChange={(event) => handleInputChange(event, 3)}
                maxLength={1}
                ref={inputRefs[3]}
            />
            <Button
                type="button"
                onClick={handleDeleteLastChar}
                variant="clear"
                className={classes.clearButton}
                disabled={code.every((char) => char === '')}
            >
                <Icon Svg={BackspaceIcon} className={classes.icon} />
            </Button>
        </form>
    );
});
