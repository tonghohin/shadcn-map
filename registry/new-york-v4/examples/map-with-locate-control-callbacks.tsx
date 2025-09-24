"use client"

import {
    Map,
    MapLocateControl,
    MapPopup,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { useState } from "react"
import { toast } from "sonner"

export function MapWithLocateControlCallbacks() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression
    const [myCoordinates, setMyCoordinates] = useState<LatLngExpression | null>(
        null
    )

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapLocateControl
                onLocationFound={(location) =>
                    setMyCoordinates(location.latlng)
                }
                onLocationError={(error) => toast.error(error.message)}
                watch
            />
            {myCoordinates && (
                <MapPopup
                    position={myCoordinates}
                    offset={[0, -5]}
                    className="w-56">
                    {myCoordinates.toString()}
                </MapPopup>
            )}
        </Map>
    )
}
