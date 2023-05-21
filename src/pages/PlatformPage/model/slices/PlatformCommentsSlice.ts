import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchCommentsByPlatformId } from '../services/fetchCommentsByPlatformId';
import { PlatformPageCommentsSchema } from '../types/index';

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment._id,
});

export const getPlatformComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.platformPage?.comments || commentsAdapter.getInitialState(),
);

const PlatformPageCommentsSlice = createSlice({
    name: 'PlatformPageCommentsSlice',
    initialState: commentsAdapter.getInitialState<PlatformPageCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(fetchCommentsByPlatformId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByPlatformId.fulfilled, (
                state,
                action: PayloadAction<Comment[]>,
            ) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByPlatformId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { reducer: PlatformPageCommentsReducers } = PlatformPageCommentsSlice;
