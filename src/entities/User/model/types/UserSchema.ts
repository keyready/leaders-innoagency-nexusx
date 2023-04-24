import { User } from './User';

export interface UserSchema {
    authData?: User;
    _inited?: boolean;
}
