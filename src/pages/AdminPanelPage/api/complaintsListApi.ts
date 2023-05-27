import { rtkApi } from 'shared/api/rtkApi';
import { Complaint } from 'entities/Complaint';

const complaintsList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getComplaints: build.query<Complaint[], string>({
            query: () => ({
                url: '/complaints',
            }),
        }),
    }),
});

export const useComplaintsListQuery = complaintsList.useGetComplaintsQuery;
