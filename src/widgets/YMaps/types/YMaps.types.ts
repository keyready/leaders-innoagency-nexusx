export type GeocodeResponse = {
    geoObjects: {
        get(index: number):
            | undefined
            | {
            geometry: {
                getCoordinates(): number[];
            };
        };
    };
};
