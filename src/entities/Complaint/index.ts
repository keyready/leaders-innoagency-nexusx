export { ComplaintCard } from './ui/ComplaintCard/ComplaintCard';
export type { Complaint, ComplaintSchema } from './model/types/ComplaintSchema';
export {
    ComplaintActions,
    ComplaintReducer,
} from './model/slices/ComplaintSlice';
export { submitComplaint } from './model/services/submitComplaint';
export {
    getComplaintData,
    getComplaintIsLoading,
    getComplaintError,
} from './model/selectors/getComplaintData';
