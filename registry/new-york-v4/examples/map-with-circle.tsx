import { Map, MapCircle, MapTileLayer } from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithCircle() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapCircle center={TORONTO_COORDINATES} radius={200} />
        </Map>
    )
}
