import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { deleteComment } from '../services/deleteComment';
import { GetCommentsSchema } from '../types/getCommentsSchema';
import { fetchCommentsByUserId } from '../services/fetchCommentsByUserId';

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment._id,
});

export const getComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.getComments || commentsAdapter.getInitialState(),
);

export const getCommentsSlice = createSlice({
    name: 'getComments',
    initialState: commentsAdapter.getInitialState<GetCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByUserId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByUserId.fulfilled, (
                state,
                action: PayloadAction<Comment[]>,
            ) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByUserId.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.data;
            })

            .addCase(deleteComment.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: getCommentsActions } = getCommentsSlice;
export const { reducer: getCommentsReducer } = getCommentsSlice;
