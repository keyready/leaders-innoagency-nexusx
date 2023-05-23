import { User } from './User';

export interface UserSchema {
    authData?: User;
    isLoading?: boolean;
    error?: string;
    checkOldPasswordError?: string;
    _inited?: boolean;
    _authorized?: boolean;}
