"use client"

import {
    Map,
    MapMarker,
    MapSearchControl,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { PlaceFeature } from "@/registry/new-york-v4/ui/place-autocomplete"
import type { LatLngExpression } from "leaflet"
import { MapPinIcon } from "lucide-react"
import React from "react"

export function MapWithSearchControlResultsChange() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    const [searchResults, setSearchResults] = React.useState<PlaceFeature[]>([])

    return (
        <Map center={TORONTO_COORDINATES} zoom={2}>
            <MapTileLayer />
            <MapSearchControl
                onResultsChange={(results) => setSearchResults(results)}
            />
            {searchResults.map((result) => (
                <MapMarker
                    key={result.properties.osm_id}
                    position={
                        result.geometry.coordinates.toReversed() as LatLngExpression
                    }
                    icon={<MapPinIcon />}
                />
            ))}
        </Map>
    )
}
