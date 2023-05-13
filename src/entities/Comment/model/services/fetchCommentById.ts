import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Comment } from '../types/CommentSchema';

export const fetchCommentById = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>>(
        'comment/fetchCommentById',
        async (id, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.get<Comment>(`/comments?platformId=${id}`, {
                    params: {
                        _expand: 'user',
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                // @ts-ignore
                console.log(response.data[0]);

                // @ts-ignore
                return response.data[0];
            } catch (error) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
        },
    );
