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
    place: string;
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
    } = props;

    const [coords, setCoords] = useState<number[]>([]);
    const [metroCoords, setMetroCoords] = useState<number[] | null>(null);
    const [isMapsLoading, setIsMapsLoading] = useState<boolean>(true);

    const handleLoadMap = (ymaps: YMapsApi) => {
        getPlaceCoordinates(ymaps, place)
            .then((coordinates) => {
                if (coordinates) {
                    setCoords(coordinates);
                }
            });
        if (metroName) {
            getPlaceCoordinates(ymaps, `г. Москва, станция метро ${metroName}`)
                .then((coordinates) => {
                    if (coordinates) {
                        setMetroCoords(coordinates);
                    }
                });
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
            {isMapsLoading && (<Skeleton width="100%" height="400px" border="15px" />)}
            <YandexMaps
                query={{
                    lang: 'ru_RU',
                    apikey: 'ecf6cfae-18d0-43e2-b110-0db40e6d003b',
                }}
            >
                <Map
                    onLoad={handleLoadMap}
                    modules={['geocode']}
                    style={{ width: '100%', height: 500 }}
                    state={{ center: coords, zoom: 15 }}
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
                        // options={{
                        //     iconLayout: 'default#image',
                        //     iconImageHref: 'images/main-logo.svg',
                        //     iconImageSize: [52, 70],
                        //     iconImageOffset: [-26, -55],
                        //
                        // }}
                            geometry={coords}
                        />
                    )}
                    {metroCoords && (
                        <Placemark
                            geometry={metroCoords}
                        />
                    )}
                </Map>
            </YandexMaps>
        </div>
    );
});
