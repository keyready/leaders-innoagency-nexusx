import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfilePageSchema } from '../types/ProfilePageSchema';

const initialState: ProfilePageSchema = {
    isLoading: false,
};

export const ProfilePageSlice = createSlice({
    name: 'ProfilePage',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(.rejected, (state, action) => {
    //             state.isLoading = false;
    //             // @ts-ignore
    //             state.error = action.payload.message;
    //         });
    // },
});

export const { actions: ProfilePageActions } = ProfilePageSlice;
export const { reducer: ProfilePageReducer } = ProfilePageSlice;
