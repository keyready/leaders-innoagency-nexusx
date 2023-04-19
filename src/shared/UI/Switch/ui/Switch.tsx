import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, memo, useState } from 'react';
import { Switch as HSwitch } from '@headlessui/react';
import classes from './Switch.module.scss';

interface SwitchProps {
    className?: string;
}

export const Switch = memo((props: SwitchProps) => {
    const {
        className,
    } = props;

    const [enabled, setEnabled] = useState(false);

    return (
        <HSwitch
            checked={enabled}
            onChange={setEnabled}
            as={Fragment}
        >
            {({ checked }) => (
                <button
                    className={classNames(classes.button, {
                        [classes.checkedButton]: checked,
                    })}
                >
                    <span
                        className={classNames(classes.check, {
                            [classes.checked]: checked,
                        })}
                    />
                </button>
            )}
        </HSwitch>
    );
});
