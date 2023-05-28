export { LoginPageLazy as LoginPage } from './ui/LoginPage/LoginPage.lazy';
export type { LoginPageSchema } from './model/types/LoginPageSchema';
export {
    getLoginData,
    getLoginDataError,
    getLoginDataIsLoading,
} from './model/selectors/getLoginData';
export { login } from './model/services/Login';
export { loginByYandexAuth } from './model/services/loginByYandexAuth';
