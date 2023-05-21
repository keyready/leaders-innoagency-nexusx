import { User } from './User';

export interface UserSchema {
    authData?: User;
    isLoading?: boolean;
    error?: string;
    _inited?: boolean;
    _authorized?: boolean;}
