import {
    Map,
    MapLocateControl,
    MapTileLayer,
    MapZoomControl,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithCustomControlPosition() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapZoomControl className="top-auto right-1 bottom-1 left-auto" />
            <MapLocateControl className="top-1" />
        </Map>
    )
}
