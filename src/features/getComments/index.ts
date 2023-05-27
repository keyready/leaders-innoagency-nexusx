export { GetComments } from './ui/GetComments/GetComments';
export type { GetCommentsSchema } from './model/types/getCommentsSchema';
export {
    getCommentsActions,
    getCommentsReducer,
    getComments,
} from './model/slices/getCommentsSlice';
export {
    fetchCommentsByUserId,
} from './model/services/fetchCommentsByUserId';
export { deleteComment } from './model/services/deleteComment';
export {
    getCommentsIsLoading,
    getCommentsError,
} from './model/selectors/getCommentsData';
