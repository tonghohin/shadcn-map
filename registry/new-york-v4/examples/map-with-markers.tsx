import { Map, MapMarker, MapTileLayer } from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithMarkers() {
    const CITIES = [
        {
            name: "Toronto",
            coordinates: [43.6532, -79.3832] satisfies LatLngExpression,
        },
        {
            name: "Port Elizabeth",
            coordinates: [-33.9137, 25.5827] satisfies LatLngExpression,
        },
        {
            name: "Hong Kong",
            coordinates: [22.3193, 114.1694] satisfies LatLngExpression,
        },
    ]

    return (
        <Map center={CITIES[1].coordinates} zoom={1}>
            <MapTileLayer />
            {CITIES.map((city) => (
                <MapMarker key={city.name} position={city.coordinates} />
            ))}
        </Map>
    )
}
