import { Comment } from 'entities/Comment';
import { EntityState } from '@reduxjs/toolkit';

export interface PlatformPageCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
}
