import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetMetroStationSchema, MetroStation } from '../types/getMetroStationSchema';
import { getMetroStationData } from '../services/getMetroStation';

const initialState: GetMetroStationSchema = {
    isLoading: false,
};

export const getMetroStationSlice = createSlice({
    name: 'getMetroStation',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetroStationData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getMetroStationData.fulfilled, (state, action: PayloadAction<MetroStation>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getMetroStationData.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: getMetroStationActions } = getMetroStationSlice;
export const { reducer: getMetroStationReducer } = getMetroStationSlice;
