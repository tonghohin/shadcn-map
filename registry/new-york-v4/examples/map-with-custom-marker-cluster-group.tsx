"use client"

import {
    Map,
    MapMarker,
    MapMarkerClusterGroup,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export default function MapWithCustomMarkerClusterGroup() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression
    const CLUSTER_POINTS = [
        { position: [43.6632, -79.3732] },
        { position: [43.6652, -79.3752] },
        { position: [43.6612, -79.3712] },
        { position: [43.6432, -79.3932] },
        { position: [43.6412, -79.3952] },
        { position: [43.6452, -79.3912] },
        { position: [43.6732, -79.4032] },
        { position: [43.6752, -79.4052] },
        { position: [43.6712, -79.4012] },
        { position: [43.6772, -79.4072] },
        { position: [43.6332, -79.3632] },
        { position: [43.6312, -79.3612] },
        { position: [43.6532, -79.3832] },
        { position: [43.6582, -79.3882] },
        { position: [43.6482, -79.3782] },
    ] satisfies { position: LatLngExpression }[]

    return (
        <Map center={TORONTO_COORDINATES} zoom={12}>
            <MapTileLayer />
            <MapMarkerClusterGroup
                showCoverageOnHover={false}
                icon={(markerCount) => (
                    <div className="bg-popover text-popover-foreground flex size-10 items-center justify-center rounded-full border font-semibold">
                        {markerCount}
                    </div>
                )}>
                {CLUSTER_POINTS.map((point, i) => (
                    <MapMarker key={i} position={point.position} />
                ))}
            </MapMarkerClusterGroup>
        </Map>
    )
}
