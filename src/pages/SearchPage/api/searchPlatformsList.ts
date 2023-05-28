import { rtkApi } from 'shared/api/rtkApi';
import { Complaint } from 'entities/Complaint';
import { Platform } from 'entities/Platform';

interface searchPlatformsProps {
    page?: number;
    q?: string;
}

const searchPlatformsList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSearchPlatforms: build.query<Platform[], searchPlatformsProps>({
            query: ({ page, q }: searchPlatformsProps) => ({
                url: `/platforms?_page=${page}&_limit=20&q=${q}`,
            }),
        }),
    }),
});

export const useSearchPlatformsListQuery = searchPlatformsList.useGetSearchPlatformsQuery;
