import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRoles } from '../consts/consts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserLoading = (state: StateSchema) => state.user.isLoading;

export const isUserAdmin = createSelector(
    getUserRoles,
    (userRoles) => Boolean(userRoles?.includes(UserRoles.ADMIN)),
);
export const isUserOwner = createSelector(
    getUserRoles,
    (userRoles) => Boolean(userRoles?.includes(UserRoles.OWNER)),
);
