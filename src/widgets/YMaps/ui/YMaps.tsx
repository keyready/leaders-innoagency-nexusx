import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import {
    FullscreenControl, Map, Placemark, RoutePanel, YMapsApi, YMaps as YandexMaps,
} from 'react-yandex-maps';
import { getPlaceCoordinates } from '../lib/getPlaceCoords';
import classes from './YMaps.module.scss';

interface YMapsProps {
    className?: string;
    place: string;
}

export const YMaps = memo((props: YMapsProps) => {
    const {
        className,
        place,
    } = props;
    const { t } = useTranslation();
    const [coords, setCoords] = useState<number[]>();

    const handleLoadMap = (ymaps: YMapsApi) => {
        getPlaceCoordinates(ymaps, place)
            .then((coordinates) => {
                if (coordinates) setCoords(coordinates);
            });
    };

    return (
        <YandexMaps
            query={{ lang: 'ru_RU', apikey: 'ecf6cfae-18d0-43e2-b110-0db40e6d003b' }}
        >
            <Map
                onLoad={handleLoadMap}
                modules={['geocode']}
                style={{ width: '100%', height: 500 }}
                defaultState={{ center: [59.95, 30.28], zoom: 15 }}
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
            </Map>
        </YandexMaps>
    );
});
