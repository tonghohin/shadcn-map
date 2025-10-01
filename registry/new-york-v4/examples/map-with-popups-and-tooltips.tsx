import {
    Map,
    MapMarker,
    MapPolygon,
    MapPopup,
    MapTileLayer,
    MapTooltip,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithPopupAndTooltip() {
    const POPUP_CITIES = [
        {
            name: "Toronto",
            coordinates: [43.6532, -79.3832] satisfies LatLngExpression,
        },
        {
            name: "Port Elizabeth",
            coordinates: [-33.9137, 25.5827] satisfies LatLngExpression,
        },
    ]
    const TOOLTIP_CITIES = [
        {
            name: "Hong Kong",
            coordinates: [22.3193, 114.1694] satisfies LatLngExpression,
        },
        {
            name: "Taiwan",
            coordinates: [12.9236, 100.8825] satisfies LatLngExpression,
        },
    ]
    const SOUTH_AMERICA_BOUNDS = [
        [12.5, -81.7],
        [12.5, -34.8],
        [-55.0, -34.8],
        [-55.0, -81.7],
    ] satisfies LatLngExpression[]

    return (
        <Map center={POPUP_CITIES[1].coordinates} zoom={1}>
            <MapTileLayer />
            {POPUP_CITIES.map((city) => (
                <MapMarker key={city.name} position={city.coordinates}>
                    <MapPopup className="w-56">Say hi to {city.name}!</MapPopup>
                </MapMarker>
            ))}
            {TOOLTIP_CITIES.map((city) => (
                <MapMarker key={city.name} position={city.coordinates}>
                    <MapTooltip side="bottom">
                        Say hi to {city.name}!
                    </MapTooltip>
                </MapMarker>
            ))}
            <MapPolygon positions={SOUTH_AMERICA_BOUNDS}>
                <MapPopup className="w-56">Say hi to South America!</MapPopup>
            </MapPolygon>
        </Map>
    )
}
