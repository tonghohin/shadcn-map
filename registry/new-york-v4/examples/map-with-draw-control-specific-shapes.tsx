import {
    Map,
    MapDrawCircle,
    MapDrawControl,
    MapDrawEdit,
    MapDrawPolygon,
    MapDrawRectangle,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithDrawControlSpecificShapes() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapDrawControl>
                <MapDrawCircle />
                <MapDrawRectangle />
                <MapDrawPolygon />
                <MapDrawEdit />
            </MapDrawControl>
        </Map>
    )
}
