import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './StepFourForm.module.scss';

interface StepFourFormProps {
    className?: string;
}

export const StepFourForm = memo((props: StepFourFormProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.StepFourForm, {}, [className])}>
            //
        </div>
    );
});
