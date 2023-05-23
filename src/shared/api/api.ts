/**
 Все, что связано с инстанс апи - урок 38.
 Там еще изменения в loginByUsername и многих других файлах.
 Посмотришь ес чо по коммиту
 */

import axios from 'axios';
import { USER_ACCESSTOKEN_KEY } from 'shared/const';
import Cookies from 'js-cookie';

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        // const auth: any = config.headers.authorization;
        // if (!auth) {
        //     config.headers.authorization = Cookies.get(USER_ACCESSTOKEN_KEY) || '';
        // }
        // config.headers.language = localStorage.getItem('i18nextLng') || '';
    }

    return config;
});
