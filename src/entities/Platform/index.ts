export { PlatformCard } from './ui/Platform/PlatformCard';
export type { PlatformSchema } from './model/types/PlatformSchema';
export type {
    Platform,
    Booking,
    InformationBlockImage,
    InformationBlockText,
    InformationBlockType,
} from './model/types/Platform';
export {
    getPlatformData,
    getPlatformIsLoading,
    getPlatformError,
} from './model/selectors/getPlatform';
