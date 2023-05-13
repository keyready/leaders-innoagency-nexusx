export { CommentCard } from './ui/CommentCard/CommentCard';
export type { CommentSchema, Comment } from './model/types/CommentSchema';
export {
    CommentActions,
    CommentReducer,
} from './model/slices/CommentSlice';
export {
    fetchCommentById,
} from './model/services/fetchCommentById';
export {
    getCommentData,
    getCommentError,
    getCommentIsLoading,
} from './model/selectors/getCommentData';
