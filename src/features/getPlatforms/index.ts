export { GetPlatforms } from './ui/GetPlatforms/GetPlatforms';
export type { GetPlatformsSchema } from './model/types/getPlatformsSchema';
export {
    getPlatformsActions,
    getPlatformsReducer,
    getPlatforms,
} from './model/slices/getPlatformsSlice';
export { fetchPlatforms } from './model/services/fetchPlatforms';
export {
    getFetchPlatformError,
} from './model/selectors/platfromsSelectors';
