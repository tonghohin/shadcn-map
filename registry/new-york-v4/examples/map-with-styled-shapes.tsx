import {
    Map,
    MapCircle,
    MapRectangle,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngBoundsExpression, LatLngExpression } from "leaflet"

export function MapWithStyledShapes() {
    const BOUNDS = [
        [43.65, -79.387],
        [43.6565, -79.379],
    ] satisfies LatLngBoundsExpression
    const CIRCLE_COORDINATES = [43.658, -79.388] satisfies LatLngExpression

    return (
        <Map center={BOUNDS[0]} zoom={14}>
            <MapTileLayer />
            <MapRectangle
                bounds={BOUNDS}
                className="fill-destructive stroke-destructive stroke-1"
            />
            <MapCircle
                center={CIRCLE_COORDINATES}
                radius={300}
                className="fill-yellow-600 stroke-yellow-600 stroke-1"
            />
        </Map>
    )
}
