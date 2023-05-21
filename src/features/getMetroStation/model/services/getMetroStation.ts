import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { MetroStation } from '../types/getMetroStationSchema';

export const getMetroStationData = createAsyncThunk<
    MetroStation,
    string,
    ThunkConfig<string>
>(
    'metroStations/getMetroStations',
    async (query, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        const body = {
            query,
            filters: [{
                city_kladr_id: '7800000000000',
            }],
        };

        try {
            const response = await extra.api.post<MetroStation>(
                'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/metro',
                JSON.stringify(body),
                {
                    headers: {
                        authorization: 'Token 5ef98f5781a106962077fb18109095f9f11ebac1',
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                // @ts-ignore
                color: response.data.suggestions[0].data.color,
                // @ts-ignore
                name: response.data.suggestions[0].data.name,
                // @ts-ignore
                line: response.data.suggestions[0].data.line_id,
                // @ts-ignore
                lat: response.data.suggestions[0].data.geo_lat,
                // @ts-ignore
                lng: response.data.suggestions[0].data.geo_lon,
            };
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
