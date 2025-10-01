import {
    Map,
    MapLayerGroup,
    MapLayers,
    MapLayersControl,
    MapMarker,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { PawPrintIcon } from "lucide-react"

export function MapWithLayerGroupsControl() {
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
            <MapTileLayer />
            <MapLayers defaultLayerGroups={PLACES.map((place) => place.name)}>
                <MapLayersControl layerGroupsLabel="Safari" />
                {PLACES.map((place) => (
                    <MapLayerGroup key={place.name} name={place.name}>
                        <MapMarker
                            key={place.name}
                            position={place.coordinates}
                            icon={place.icon}
                        />
                    </MapLayerGroup>
                ))}
            </MapLayers>
        </Map>
    )
}
