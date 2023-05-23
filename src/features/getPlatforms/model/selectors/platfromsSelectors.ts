import { StateSchema } from 'app/providers/StoreProvider';

export const getFetchPlatformsError = (state: StateSchema) => state.getPlatforms?.error;
export const getFetchPlatformsIsLoading = (state: StateSchema) => state.getPlatforms?.isLoading;
