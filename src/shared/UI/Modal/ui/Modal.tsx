import {
    Fragment, memo, ReactNode,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Modal.module.scss';

interface ModalProps {
    className?: string;
    title?: string
    children?: ReactNode;
    footer?: ReactNode;
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
}

export const Modal = memo((props: ModalProps) => {
    const {
        className,
        children,
        footer,
        title,
        isOpen,
        setIsOpen,
    } = props;

    return (
        <Transition
            appear
            show={isOpen}
            as={Fragment}
        >
            <Dialog
                as="div"
                className={classNames(classes.DialogWrapper, {}, [className])}
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    enter={classes.enter}
                    enterFrom={classes.enterForm}
                    enterTo={classes.enterTo}
                    leave={classes.leave}
                    leaveFrom={classes.leaveFrom}
                    leaveTo={classes.leaveTo}
                    as={Fragment}
                >
                    <Dialog.Panel className={classes.DialogPanel}>
                        {title && (<Dialog.Title className={classes.DialogTitle}>{title}</Dialog.Title>)}
                        <Dialog.Description className={classes.DialogDescription}>
                            {children}
                        </Dialog.Description>

                        {footer}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
});
