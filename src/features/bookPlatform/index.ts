export { BookPlatformCard } from './ui/BookPlatform/BookPlatformCard';
export type { BookPlatformSchema } from './model/types/bookPlatformSchema';
export {
    bookPlatformActions,
    bookPlatformReducer,
} from './model/slices/bookPlatformSlice';
export {
    bookPlatform,
} from './model/services/bookPlatform';
export {
    getBookPlatformError,
    getBookPlatformIsLoading,
    getBookPlatformSuccessMessage,
} from './model/selectors/getBookPlatformData';
