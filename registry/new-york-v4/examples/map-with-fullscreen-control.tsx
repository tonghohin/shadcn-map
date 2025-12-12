import {
    Map,
    MapTileLayer,
    MapFullscreenControl,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithFullscreenControl() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapFullscreenControl />
        </Map>
    )
}
