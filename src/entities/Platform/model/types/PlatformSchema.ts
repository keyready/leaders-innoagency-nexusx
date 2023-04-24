import { Platform } from './Platform';

export interface PlatformSchema {
    data?: Platform;
    isLoading: boolean;
    error?: string;
}
