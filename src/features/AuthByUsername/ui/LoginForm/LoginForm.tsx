import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from 'shared/UI/Text';
import { Input } from 'shared/UI/Input';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import classes from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const {
        className,
        onSuccess,
    } = props;

    const onUsernameChange = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onPasswordChange = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [dispatch, onSuccess, password, username]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <form
                className={classNames(classes.LoginForm, {}, [className])}
            >
                {error && (
                    <Text
                        className={classes.loginError}
                        title={error}
                    />
                )}
                <Input
                    autoFocus
                    placeholder="Введите имя"
                    value={username}
                    onChange={onUsernameChange}
                    type="text"
                />
                <Input
                    placeholder="Введите пароль"
                    value={password}
                    onChange={onPasswordChange}
                    type="password"
                />
                <Button
                    variant="primary"
                    className={classes.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                    type="submit"
                >
                    Войти
                </Button>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
