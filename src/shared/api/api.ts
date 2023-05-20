/**
 Все, что связано с инстанс апи - урок 38.
 Там еще изменения в loginByUsername и многих других файлах.
 Посмотришь ес чо по коммиту
 */

import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        const auth: any = config.headers.Authorization;
        if (!auth) {
            config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
        }
        config.headers.language = localStorage.getItem('i18nextLng') || '';
    }

    return config;
});
