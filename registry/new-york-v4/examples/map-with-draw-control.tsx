import {
    Map,
    MapDrawCircle,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit,
    MapDrawMarker,
    MapDrawPolygon,
    MapDrawPolyline,
    MapDrawRectangle,
    MapDrawUndo,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithDrawControl() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapDrawControl>
                <MapDrawMarker />
                <MapDrawPolyline />
                <MapDrawCircle />
                <MapDrawRectangle />
                <MapDrawPolygon />
                <MapDrawEdit />
                <MapDrawDelete />
                <MapDrawUndo />
            </MapDrawControl>
        </Map>
    )
}
