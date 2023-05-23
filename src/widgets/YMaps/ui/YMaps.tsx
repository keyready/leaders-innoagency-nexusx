import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, useEffect, useRef, useState,
} from 'react';
import {
    FullscreenControl, Map, Placemark, RoutePanel, YMapsApi, YMaps as YandexMaps,
} from 'react-yandex-maps';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { getPlaceCoordinates } from '../lib/getPlaceCoords';
import classes from './YMaps.module.scss';

interface YMapsProps {
    className?: string;
    place: string;
    metroName?: string;
    metroCoords?: number[];
    setIsLoading?: (status: boolean) => void;
}

export const YMaps = memo((props: YMapsProps) => {
    const {
        className,
        place,
        metroName,
    } = props;
    const { t } = useTranslation();

    const mapRef = useRef<typeof Map | null>(null);
    const [coords, setCoords] = useState<number[]>([59.95, 30.28]);
    const [metroCoords, setMetroCoords] = useState<number[]>([59.00, 30.28]);
    const [isMapsLoading, setIsMapsLoading] = useState<boolean>(true);

    const handleLoadMap = (ymaps: YMapsApi) => {
        getPlaceCoordinates(ymaps, place)
            .then((coordinates) => {
                if (coordinates) {
                    console.log('place', coordinates);
                    setCoords(coordinates);
                }
            });
        if (metroName) {
            getPlaceCoordinates(ymaps, metroName)
                .then((coordinates) => {
                    if (coordinates) {
                        console.log('metro', coordinates);
                        setMetroCoords(coordinates);
                    }
                });
        }
        setIsMapsLoading(false);
    };

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
                    options={{ minZoom: 10, maxZoom: 15 }}
                    state={{ center: coords, zoom: 15 }}
                >
                    {/* <RoutePanel */}
                    {/*    options={{ */}
                    {/*        float: 'left', */}
                    {/*        maxWidth: 270, */}
                    {/*        reverseGeocoding: true, */}
                    {/*    }} */}
                    {/* /> */}
                    <FullscreenControl />
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
                    <Placemark
                        geometry={metroCoords}
                    />
                </Map>
            </YandexMaps>
        </div>
    );
});
