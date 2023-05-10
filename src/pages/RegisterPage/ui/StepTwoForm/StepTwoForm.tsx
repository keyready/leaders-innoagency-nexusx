import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './StepTwoForm.module.scss';

interface StepTwoFormProps {
    className?: string;
}

export const StepTwoForm = memo((props: StepTwoFormProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.StepTwoForm, {}, [className])}>
            //
        </div>
    );
});
