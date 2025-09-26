"use client"

import {
    Map,
    MapFeatureGroup,
    MapLayers,
    MapLayersControl,
    MapMarker,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { PawPrintIcon } from "lucide-react"

export function MapWithFeatureGroupsControl() {
    const PLACES = [
        {
            name: "Etosha National Park",
            coordinates: [-18.7852, 16.2638] satisfies LatLngExpression,
            icon: <PawPrintIcon />,
        },
        {
            name: "Serengeti",
            coordinates: [-2.3333, 34.8333] satisfies LatLngExpression,
            icon: <PawPrintIcon />,
        },
        {
            name: "Kruger National Park",
            coordinates: [-23.9884, 31.5547] satisfies LatLngExpression,
            icon: <PawPrintIcon />,
        },
    ]

    return (
        <Map center={PLACES[0].coordinates} zoom={3}>
            <MapLayers defaultLayerGroups={PLACES.map((place) => place.name)}>
                <MapLayersControl layerGroupsLabel="Safari" />
                <MapTileLayer />
                {PLACES.map((place) => (
                    <MapFeatureGroup
                        key={place.name}
                        name={place.name}
                        eventHandlers={{
                            click: () =>
                                console.log("One handler rule them all!"),
                        }}>
                        <MapMarker
                            key={place.name}
                            position={place.coordinates}
                            icon={place.icon}
                        />
                    </MapFeatureGroup>
                ))}
            </MapLayers>
        </Map>
    )
}
