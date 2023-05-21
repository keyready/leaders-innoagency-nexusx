export { PlatformPageLazy as PlatformPage } from './ui/PlatformPage/PlatformPage.lazy';
export type { PlatformPageCommentsSchema, PlatformPageSchema } from './model/types/index';
export { fetchCommentsByPlatformId } from './model/services/fetchCommentsByPlatformId';
export {
    getPlatformComments,
    PlatformPageCommentsReducers,
} from './model/slices/PlatformCommentsSlice';
export {
    getCommentsIsLoading,
    getCommentsError,
} from './model/selectors/getCommetsStatus';
