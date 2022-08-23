import React, { useEffect, useRef } from "react";

import classes from "./Map.module.css";

type StyleObj = {
    [props: string]: string;
};

type mapCenterObj = {
    lat: number;
    lng: number;
};

interface MapProps<T, U> {
    className?: string;
    style?: T;
    center: U;
    zoom: number;
}

const Map: React.FC<MapProps<StyleObj, mapCenterObj>> = ({
    center,
    zoom,
    className,
    style,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current!, {
            center: center,
            zoom: zoom,
        });

        new window.google.maps.Marker({ position: center, map });
    }, [center, zoom]);

    return (
        <div
            ref={mapRef}
            className={`${classes.map} ${className}`}
            style={style}
        ></div>
    );
};

export default Map;
