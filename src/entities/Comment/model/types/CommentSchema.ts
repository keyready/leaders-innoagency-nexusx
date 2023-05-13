import { User } from 'entities/User';

export interface Comment {
    _id: string;
    user: User;
    rate: number;
    body: string;
}

export interface CommentSchema {
    data?: Comment;
    isLoading: boolean;
    error?: string
}
