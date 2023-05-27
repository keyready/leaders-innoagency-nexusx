import { rtkApi } from 'shared/api/rtkApi';
import { User } from 'entities/User';

const usersList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => ({
                url: '/users',
            }),
        }),
    }),
});

export const useUsersListQuery = usersList.useGetUsersQuery;
