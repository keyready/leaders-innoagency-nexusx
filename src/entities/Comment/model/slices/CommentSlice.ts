import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentSchema } from '../types/CommentSchema';
import { fetchCommentById } from '../services/fetchCommentById';

const initialState: CommentSchema = {
    isLoading: false,
};

export const CommentSlice = createSlice({
    name: 'Comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentById.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCommentById.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: CommentActions } = CommentSlice;
export const { reducer: CommentReducer } = CommentSlice;
