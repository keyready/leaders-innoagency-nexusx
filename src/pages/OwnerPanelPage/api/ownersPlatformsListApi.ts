import { rtkApi } from 'shared/api/rtkApi';
import { Booking } from 'entities/Booking';

const ownersPlatformList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getOwnersPlatform: build.query<Booking[], string>({
            query: (ownerId: string) => ({
                url: `/get_owners_bookings?ownerId=${ownerId}`,
            }),
        }),
    }),
});

export const useOwnersPlatformListQuery = ownersPlatformList.useGetOwnersPlatformQuery;
