import { User } from 'entities/User';

export interface ProfilePageSchema {
    data?: User
    isLoading: boolean;
    error?: string
}
