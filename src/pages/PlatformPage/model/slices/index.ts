import { combineReducers } from '@reduxjs/toolkit';
import { PlatformPageSchema } from '../types';
import { PlatformPageCommentsReducers } from './PlatformCommentsSlice';

export const platformPageReducers = combineReducers<PlatformPageSchema>({
    comments: PlatformPageCommentsReducers,
});
