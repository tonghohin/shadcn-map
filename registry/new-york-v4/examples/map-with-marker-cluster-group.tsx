import {
    Map,
    MapMarker,
    MapMarkerClusterGroup,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export default function MapWithMarkerClusterGroup() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression
    const CLUSTER_POINTS = [
        { position: [43.6632, -79.3832] },
        { position: [43.6642, -79.3842] },
        { position: [43.6622, -79.3852] },
        { position: [43.6652, -79.3822] },
        { position: [43.6612, -79.3812] },
        { position: [43.6432, -79.3932] },
        { position: [43.6442, -79.3942] },
        { position: [43.6422, -79.3952] },
    ] satisfies { position: LatLngExpression }[]

    return (
        <Map center={TORONTO_COORDINATES} zoom={12}>
            <MapTileLayer />
            <MapMarkerClusterGroup>
                {CLUSTER_POINTS.map((point, i) => (
                    <MapMarker key={i} position={point.position} />
                ))}
            </MapMarkerClusterGroup>
        </Map>
    )
}
