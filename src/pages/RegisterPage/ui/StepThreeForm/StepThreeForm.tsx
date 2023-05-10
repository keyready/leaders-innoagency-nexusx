import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './StepThreeForm.module.scss';

interface StepThreeFormProps {
    className?: string;
}

export const StepThreeForm = memo((props: StepThreeFormProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.StepThreeForm, {}, [className])}>
            //
        </div>
    );
});
