import { rtkApi } from 'shared/api/rtkApi';
import { Complaint } from 'entities/Complaint';

const complaintsList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getComplaints: build.query<Complaint[], number>({
            query: (page: number) => ({
                url: `/complaints?_page=${page}&_limit=5`,
            }),
        }),
    }),
});

export const useComplaintsListQuery = complaintsList.useGetComplaintsQuery;
