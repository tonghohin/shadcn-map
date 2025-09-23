import {
    Map,
    MapCircleMarker,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithCircleMarker() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapCircleMarker center={TORONTO_COORDINATES} radius={60} />
        </Map>
    )
}
