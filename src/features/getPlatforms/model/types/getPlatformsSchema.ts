import { Platform } from 'entities/Platform';
import { EntityState } from '@reduxjs/toolkit';

export interface Error {
    data: string;
    code: number
}

export interface GetPlatformsSchema extends EntityState<Platform>{
    isLoading: boolean;
    error?: Error;
}
