import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Platform } from 'entities/Platform';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchPlatforms } from '../services/fetchPlatforms';
import { GetPlatformsSchema, Error } from '../types/getPlatformsSchema';

const platformAdapter = createEntityAdapter<Platform>({
    selectId: (platform) => platform._id,
});

export const getPlatforms = platformAdapter.getSelectors<StateSchema>(
    (state) => state.getPlatforms || platformAdapter.getInitialState(),
);

export const getPlatformsSlice = createSlice({
    name: 'getPlatforms',
    initialState: platformAdapter.getInitialState<GetPlatformsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlatforms.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchPlatforms.fulfilled, (state, action: PayloadAction<Platform[]>) => {
                state.isLoading = false;
                platformAdapter.setAll(state, action.payload);
            })
            .addCase(fetchPlatforms.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.data;
            });
    },
});

export const { actions: getPlatformsActions } = getPlatformsSlice;
export const { reducer: getPlatformsReducer } = getPlatformsSlice;
