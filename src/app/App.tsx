import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Navbar } from 'widgets/Navbar';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, getUserInited, userActions } from 'entities/User';
import 'app/styles/index.scss';
import Cookies from 'js-cookie';
import { USER_REFRESHTOKEN_KEY } from 'shared/const';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    // проверить, был ли авторизован пользователь перед закрытием вкладки
    useEffect(() => {
        dispatch(userActions.initAuthData());

        const refreshToken = Cookies.get(USER_REFRESHTOKEN_KEY);
        if (refreshToken) {
            dispatch(checkAuth(refreshToken));
        }
    }, [dispatch]);

    return (
        <div
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                <Navbar />
                <div className="page">
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};
