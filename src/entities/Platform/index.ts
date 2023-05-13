export { PlatformCard } from './ui/PlatformCard/PlatformCard';
export type { PlatformSchema } from './model/types/PlatformSchema';
export type {
    Platform,
    Booking,
} from './model/types/Platform';
export {
    getPlatformData,
    getPlatformIsLoading,
    getPlatformError,
} from './model/selectors/getPlatform';
export { getPlatformById } from './model/services/getPlatformById';
