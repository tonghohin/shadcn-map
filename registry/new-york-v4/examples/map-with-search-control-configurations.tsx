import {
    Map,
    MapSearchControl,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithSearchControlConfigurations() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES} zoom={2}>
            <MapTileLayer />
            <MapSearchControl limit={10} lang="en" />
        </Map>
    )
}
