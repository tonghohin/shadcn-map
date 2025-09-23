import { Map, MapRectangle, MapTileLayer } from "@/registry/new-york-v4/ui/map"
import type { LatLngBoundsExpression } from "leaflet"

export function MapWithRectangle() {
    const BOUNDS = [
        [43.65, -79.387],
        [43.6565, -79.379],
    ] satisfies LatLngBoundsExpression

    return (
        <Map center={BOUNDS[0]} zoom={14}>
            <MapTileLayer />
            <MapRectangle bounds={BOUNDS} />
        </Map>
    )
}
