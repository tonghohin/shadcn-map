import { Map, MapPolyline, MapTileLayer } from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithPolyline() {
    const POINTS = [
        [43.6532, -79.3832],
        [43.6545, -79.38],
    ] satisfies LatLngExpression[]

    return (
        <Map center={POINTS[0]}>
            <MapTileLayer />
            <MapPolyline positions={POINTS} />
        </Map>
    )
}
