"use client"

import {
    Map,
    MapMarker,
    MapSearchControl,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { MapPinIcon } from "lucide-react"
import React from "react"
import { useMap } from "react-leaflet"

export function MapWithSearchControlPlaceSelect() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapSearchControlWrapper />
        </Map>
    )
}

function MapSearchControlWrapper() {
    const map = useMap()
    const [selectedPosition, setSelectedPosition] =
        React.useState<LatLngExpression | null>(null)

    React.useEffect(() => {
        if (!selectedPosition) return
        map.panTo(selectedPosition)
    }, [selectedPosition])

    return (
        <>
            <MapSearchControl
                onPlaceSelect={(feature) =>
                    setSelectedPosition(
                        feature.geometry.coordinates.toReversed() as LatLngExpression
                    )
                }
            />
            {selectedPosition && (
                <MapMarker position={selectedPosition} icon={<MapPinIcon />} />
            )}
        </>
    )
}
