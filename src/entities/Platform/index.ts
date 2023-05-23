export { PlatformCard } from './ui/PlatformCard/PlatformCard';
export type { PlatformSchema } from './model/types/PlatformSchema';
export type {
    Platform,

} from './model/types/Platform';
export { PlatformReducer, PlatformActions } from './model/slices/PlatformSlice';
export {
    getPlatformData,
    getPlatformIsLoading,
    getPlatformError,
} from './model/selectors/getPlatform';
export { getPlatformById } from './model/services/getPlatformById';
