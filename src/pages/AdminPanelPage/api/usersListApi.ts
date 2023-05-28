import { rtkApi } from 'shared/api/rtkApi';
import { User } from 'entities/User';

const usersList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], number>({
            query: (page: number) => ({
                url: `/users?_page=${page}&_limit=5`,
            }),
        }),
    }),
});

export const useUsersListQuery = usersList.useGetUsersQuery;
