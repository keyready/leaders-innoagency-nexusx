import { YMapsApi } from 'react-yandex-maps';

import { GeocodeResponse } from '../types/YMaps.types';

export const getPlaceCoordinates = (ymaps: YMapsApi, place: string): Promise<number[] | undefined> => ymaps
    .geocode(place, { results: 1 })
    .then((res: GeocodeResponse) => res.geoObjects.get(0)?.geometry?.getCoordinates());
