import { UserSchema } from 'entities/User';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { PlatformSchema } from 'entities/Platform';
import { GetPlatformsSchema } from 'features/getPlatforms';
import { LoginPageSchema } from 'pages/LoginPage';
import { RegisterPageSchema } from 'pages/RegisterPage';
import { CommentSchema } from 'entities/Comment';
import { GetMetroStationSchema } from 'features/getMetroStation';
import { BookPlatformSchema } from 'features/bookPlatform';
import { PlatformPageSchema } from 'pages/PlatformPage';
import { BookingSchema } from 'entities/Booking';
import { GetBookingsSchema } from 'features/getBookings';
import { GetCommentsSchema } from 'features/getComments';
import { ComplaintSchema } from 'entities/Complaint';
import { ResetPageSchema } from 'pages/ResetPage';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema
    platform: PlatformSchema;
    getBookings: GetBookingsSchema;
    getComments: GetCommentsSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // asynchronous reducers
    loginPage?: LoginPageSchema;
    platformPage?: PlatformPageSchema;
    registerPage?: RegisterPageSchema;
    resetPasswordPage?: ResetPageSchema;
    comment?: CommentSchema;
    booking?: BookingSchema;
    complaint?: ComplaintSchema;
    getPlatforms?: GetPlatformsSchema;
    metroStation?: GetMetroStationSchema;
    bookPlatform?: BookPlatformSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface reducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: reducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
