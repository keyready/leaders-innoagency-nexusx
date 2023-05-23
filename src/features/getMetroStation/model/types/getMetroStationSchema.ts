export interface MetroStation {
    name: string;
    line: number;
    color: string;
    lat: number;
    lng: number;
}
export interface GetMetroStationSchema {
    data?: MetroStation;
    isLoading: boolean;
    error?: string
}
