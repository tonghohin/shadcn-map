import { Map, MapTileLayer } from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function BasicMap() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
        </Map>
    )
}
