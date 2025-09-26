import {
    Map,
    MapLocateControl,
    MapTileLayer,
    MapZoomControl,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithComplexCustomControlPosition() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <div className="absolute top-1 left-1 z-1000 grid gap-1">
                <MapZoomControl className="static" />
                <MapLocateControl className="static" />
            </div>
            <MapLocateControl className="bottom-20" />
        </Map>
    )
}
