export { RegisterPageLazy as RegisterPage } from './ui/RegisterPage/RegisterPage.lazy';
export type { RegisterPageSchema } from './model/types/RegisterPageSchema';
export { register } from './model/services/Register';
export {
    RegisterPageActions,
    RegisterPageReducer,
} from './model/slices/RegisterPageSlice';
export {
    getRegisterError,
    getRegisterIsLoading,
    getRegisterCodeError,
    getRegisterIsCodeCorrect,
} from './model/selectors/getRegisterData';
