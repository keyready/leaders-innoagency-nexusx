import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeInputs } from 'widgets/CodeInputs';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Alert } from 'shared/UI/Alert';
import { submitCode } from '../../model/services/SubmitCode';
import { getRegisterCodeError, getRegisterError } from '../../model/selectors/getRegisterData';
import classes from './StepTwoForm.module.scss';

interface StepTwoFormProps {
    className?: string;
    onSubmit: () => void;
    code?: string;
}

export const StepTwoForm = memo((props: StepTwoFormProps) => {
    const {
        className,
        onSubmit,
        code,
    } = props;

    const { t } = useTranslation('RegisterPage');
    const dispatch = useAppDispatch();

    const formRef = useRef<HTMLFormElement>(null);

    const submitCodeError = useSelector(getRegisterCodeError);

    const getCode = useCallback((code: string) => {
        if (formRef.current) {
            dispatch(submitCode(code));
        }
    }, [dispatch]);

    return (
        <div className={classNames(classes.StepTwoForm, {}, [className])}>
            <h2>{t('Пожалуйста, введите код подтверждения')}</h2>
            <form
                ref={formRef}
                onSubmit={onSubmit}
            >
                <CodeInputs getCode={getCode} />
            </form>
            {submitCodeError && (
                <Alert variant="danger">{submitCodeError}</Alert>
            )}
        </div>
    );
});
