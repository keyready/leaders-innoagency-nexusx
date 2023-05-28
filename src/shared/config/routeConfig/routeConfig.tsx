import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/mainPage';
import { AboutPage } from 'pages/aboutPage';
import { NotFound } from 'pages/NotFound';
import { UserRoles } from 'entities/User';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { ForbiddenPage } from 'pages/ForbiddenPage';
import { SearchPage } from 'pages/SearchPage';
import { MapPage } from 'pages/MapPage';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';
import { PlatformPage } from 'pages/PlatformPage';
import { OwnerPanelPage } from 'pages/OwnerPanelPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ResetPage } from 'pages/ResetPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    LOGIN = 'login',
    REGISTER = 'register',
    RESET_PASSWORD = 'reset_password',
    PLATFORM_PAGE = 'platform_page',
    ADMIN_PANEL = 'admin_panel',
    OWNER_PANEL = 'owner_panel',
    SEARCH_PAGE = 'search_page',
    MAP_PAGE = 'map_page',

    // last
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    // main
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/feed',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.RESET_PASSWORD]: '/reset',
    [AppRoutes.PLATFORM_PAGE]: '/platform/',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.OWNER_PANEL]: '/owner',
    [AppRoutes.SEARCH_PAGE]: '/search',
    [AppRoutes.MAP_PAGE]: '/map',

    // last
    [AppRoutes.FORBIDDEN]: '/forbidden',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.RESET_PASSWORD]: {
        path: RoutePath.reset_password,
        element: <ResetPage />,
    },
    [AppRoutes.PLATFORM_PAGE]: {
        path: `${RoutePath.platform_page}:id`,
        authOnly: true,
        element: <PlatformPage />,
    },
    [AppRoutes.SEARCH_PAGE]: {
        path: RoutePath.search_page,
        authOnly: true,
        element: <SearchPage />,
    },
    [AppRoutes.MAP_PAGE]: {
        path: RoutePath.map_page,
        authOnly: true,
        element: <MapPage />,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: RoutePath.admin_panel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRoles.ADMIN],
    },
    [AppRoutes.OWNER_PANEL]: {
        path: RoutePath.owner_panel,
        element: <OwnerPanelPage />,
        authOnly: true,
        roles: [UserRoles.OWNER],
    },

    // last
    [AppRoutes.FORBIDDEN]: {
        path: RoutePath.forbidden,
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
