import { StateSchema } from 'app/providers/StoreProvider';

export const getMetroStationName = (state: StateSchema) => state.metroStation?.data?.name;
export const getMetroStationColor = (state: StateSchema) => state.metroStation?.data?.color;
export const getMetroStationLine = (state: StateSchema) => state.metroStation?.data?.line;
export const getMetroStationCoords = (state: StateSchema) => [
    state.metroStation?.data?.lat,
    state.metroStation?.data?.lng,
];
export const getMetroStationDataIsLoading = (state: StateSchema) => state.metroStation?.isLoading;
export const getMetroStationDataError = (state: StateSchema) => state.metroStation?.error;
