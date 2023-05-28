import {
    memo, RefCallback, useCallback, useMemo, useState,
} from 'react';
import {
    FullscreenControl, Map, Placemark, RoutePanel, YMaps as YandexMaps, YMapsApi,
} from 'react-yandex-maps';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { RoutePanelRefObject } from '../types/YMaps.types';
import { getPlaceCoordinates } from '../lib/getPlaceCoords';

interface YMapsProps {
    className?: string;
    place?: string;
    markers?: string[];
    placeName?: string;
    metroName?: string;
    metroCoords?: number[];
    showRoute?: boolean;
}

export const YMaps = memo((props: YMapsProps) => {
    const {
        className,
        place,
        placeName,
        metroName,
        showRoute,
        markers,
    } = props;

    const [coords, setCoords] = useState<number[]>([]);
    const [metroCoords, setMetroCoords] = useState<number[] | null>(null);
    const [isMapsLoading, setIsMapsLoading] = useState<boolean>(true);
    const [mapPoints, setMapPoints] = useState<number[][]>([]);

    const handleLoadMap = (ymaps: YMapsApi) => {
        if (place) {
            getPlaceCoordinates(ymaps, place)
                .then((coordinates) => {
                    if (coordinates) {
                        setCoords(coordinates);
                    }
                });
        }
        if (metroName) {
            getPlaceCoordinates(ymaps, `г. Москва, станция метро ${metroName}`)
                .then((coordinates) => {
                    if (coordinates) {
                        setMetroCoords(coordinates);
                    }
                });
        }
        if (markers) {
            const promises = markers.map((marker) => getPlaceCoordinates(ymaps, `г. Москва, ${marker}`));

            Promise.all(promises)
                .then((coordinatesArray) => {
                    const newPlace: number[][] = [...mapPoints];

                    coordinatesArray.forEach((coordinates) => {
                        if (coordinates) {
                            newPlace.push(coordinates);
                        }
                    });

                    setMapPoints(newPlace);
                });

            setCoords(mapPoints[0]);
        }

        setIsMapsLoading(false);
    };
    const handleRoutePanelRef = useCallback<RefCallback<RoutePanelRefObject>>(
        (ref) => {
            if (!ref) {
                return;
            }

            ref.routePanel.state.set({
                type: 'pedestrian',
                to: place,
                from: `Метро ${metroName}`,
                toEnabled: false,
            });

            ref.routePanel.options.set({
                types: {
                    masstransit: true,
                    pedestrian: true,
                    auto: true,
                    bicycle: false,
                },
            });
        },
        [metroName, place],
    );
    const routePanelDefaultOptions = useMemo(
        () => ({
            float: 'left',
            maxWidth: 270,
            showHeader: true,
            reverseGeocoding: true,
            title: `${placeName}`,
        }),
        [placeName],
    );

    return (
        <div className={className}>
            {isMapsLoading && (<Skeleton width="100%" height="600px" border="15px" />)}
            <YandexMaps
                query={{
                    lang: 'ru_RU',
                    apikey: 'ecf6cfae-18d0-43e2-b110-0db40e6d003b',
                }}
            >
                <Map
                    onLoad={handleLoadMap}
                    modules={['geocode']}
                    style={{ width: '100%', height: markers?.length ? 600 : 500 }}
                    state={{
                        center: coords || metroCoords || mapPoints[0],
                        zoom: markers?.length ? 8 : 15,
                    }}
                >
                    {showRoute && metroCoords && (
                        <RoutePanel
                            instanceRef={handleRoutePanelRef}
                            options={routePanelDefaultOptions}
                        />
                    )}
                    <FullscreenControl />
                    {coords && (
                        <Placemark
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: 'images/marker.svg',
                                iconImageSize: [52, 70],
                                iconImageOffset: [-26, -55],
                            }}
                            geometry={coords}
                        />
                    )}
                    {metroCoords && (
                        <Placemark
                            geometry={metroCoords}
                        />
                    )}
                    {mapPoints.length
                        ? mapPoints.map((point, index) => (
                            <Placemark
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: 'images/marker.svg',
                                    iconImageSize: [52, 70],
                                    iconImageOffset: [-26, -55],
                                }}
                                key={index}
                                geometry={point}
                            />
                        ))
                        : ''}
                </Map>
            </YandexMaps>
        </div>
    );
});
