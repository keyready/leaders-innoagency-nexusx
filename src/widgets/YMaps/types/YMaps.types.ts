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

export type MapRefObject = {
    behaviors: {
        disable(behaviors: string[]): void;
    };
    setCenter(coordinates: number[]): void;
};

export type RoutePanelRefObject = {
    routePanel: {
        state: {
            set(state: object): void;
        };
        options: {
            set(state: object): void;
        };
    };
};
