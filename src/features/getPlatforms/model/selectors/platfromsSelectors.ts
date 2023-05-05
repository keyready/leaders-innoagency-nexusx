import { StateSchema } from 'app/providers/StoreProvider';

export const getFetchPlatformError = (state: StateSchema) => state.getPlatforms?.error;
