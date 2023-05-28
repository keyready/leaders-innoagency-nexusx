import { User } from 'entities/User';

export interface Comment {
    _id: string;
    userId: string;
    user: User;
    platformId: string;
    platformTitle: string;
    rate: number;
    body: string;
}

export interface CommentSchema {
    data?: Comment;
    isLoading: boolean;
    error?: string
}
