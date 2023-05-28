import { rtkApi } from 'shared/api/rtkApi';
import { Platform } from 'entities/Platform';

interface searchPlatformsProps {
    page?: number;
    q?: string;
    limit?: number;
}

const searchPlatformsList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSearchPlatforms: build.query<Platform[], searchPlatformsProps | string>({
            query: ({ page = 1, q = '', limit = 200 }: searchPlatformsProps) => ({
                url: `/platforms?_page=${page}&_limit=${limit}&q=${q}`,
            }),
        }),
    }),
});

export const useSearchPlatformsListQuery = searchPlatformsList.useGetSearchPlatformsQuery;
