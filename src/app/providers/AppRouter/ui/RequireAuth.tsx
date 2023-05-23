import { useSelector } from 'react-redux';
import {
    getUserAuthData, getUserRoles, isUserLoading, UserRoles,
} from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useMemo } from 'react';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRoles[]
}
export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const userLoading = useSelector(isUserLoading);
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) return true;

        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!hasRequiredRoles && !userLoading) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    if (!auth && !userLoading) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
