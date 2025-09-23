import { Map, MapPolygon, MapTileLayer } from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithPolygon() {
    const BOUNDS = [
        [43.65, -79.387],
        [43.657, -79.38],
        [43.649, -79.379],
    ] satisfies LatLngExpression[]

    return (
        <Map center={BOUNDS[0]} zoom={14}>
            <MapTileLayer />
            <MapPolygon positions={BOUNDS} />
        </Map>
    )
}
