import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeInputs } from 'widgets/CodeInputs';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Alert } from 'shared/UI/Alert';
import { Loader } from 'shared/UI/Loader';
import { HStack } from 'shared/UI/Stack';
import { submitCode } from '../../model/services/SubmitCode';
import {
    getRegisterCodeError,
    getRegisterIsCodeCorrect,
} from '../../model/selectors/getRegisterData';
import classes from './StepTwoForm.module.scss';

interface StepTwoFormProps {
    className?: string;
    onSubmit: () => void;
    code?: string;
    isLoading?: boolean
}

export const StepTwoForm = memo((props: StepTwoFormProps) => {
    const {
        className,
        onSubmit,
        isLoading,
        code,
    } = props;

    const { t } = useTranslation('RegisterPage');
    const dispatch = useAppDispatch();

    const formRef = useRef<HTMLFormElement>(null);

    const submitCodeError = useSelector(getRegisterCodeError);
    const isCodeCorrect = useSelector(getRegisterIsCodeCorrect);

    const getCode = useCallback(async (code: string) => {
        const result = await dispatch(submitCode(code));

        if (result.meta.requestStatus === 'fulfilled') {
            onSubmit?.();
        }
    }, [dispatch, isCodeCorrect, onSubmit]);

    return (
        <div className={classNames(classes.StepTwoForm, {}, [className])}>
            <p className={classes.text}>{t('Пожалуйста, введите код подтверждения')}</p>
            <form
                ref={formRef}
                onSubmit={onSubmit}
            >
                <CodeInputs className={classes.codes} getCode={getCode} />
                {isLoading && (
                    <HStack max justify="center">
                        <Loader />
                    </HStack>
                )}
            </form>
            {submitCodeError && (
                <Alert variant="danger">{submitCodeError}</Alert>
            )}
        </div>
    );
});
