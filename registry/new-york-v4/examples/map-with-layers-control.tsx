import {
    Map,
    MapLayerGroup,
    MapLayers,
    MapLayersControl,
    MapMarker,
    MapPopup,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { DropletIcon, MountainIcon, PawPrintIcon } from "lucide-react"

export function MapWithLayersControl() {
    const PLACES = [
        {
            name: "Water",
            places: [
                {
                    name: "Victoria Falls",
                    coordinates: [-17.9243, 25.856] satisfies LatLngExpression,
                    icon: <DropletIcon />,
                },
                {
                    name: "Lake Malawi",
                    coordinates: [-12.1333, 34.5667] satisfies LatLngExpression,
                    icon: <DropletIcon />,
                },
                {
                    name: "Orange River",
                    coordinates: [-28.6327, 16.4522] satisfies LatLngExpression,
                    icon: <DropletIcon />,
                },
            ],
        },
        {
            name: "Mountains",
            places: [
                {
                    name: "Table Mountain",
                    coordinates: [-33.9628, 18.4098] satisfies LatLngExpression,
                    icon: <MountainIcon />,
                },
                {
                    name: "Mount Kenya",
                    coordinates: [-0.1521, 37.3084] satisfies LatLngExpression,
                    icon: <MountainIcon />,
                },
                {
                    name: "Kilimanjaro",
                    coordinates: [-3.0674, 37.3556] satisfies LatLngExpression,
                    icon: <MountainIcon />,
                },
            ],
        },
        {
            name: "Safari",
            places: [
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
            ],
        },
    ]

    return (
        <Map center={PLACES[0].places[0].coordinates} zoom={3}>
            <MapLayers defaultLayerGroups={PLACES.map((place) => place.name)}>
                <MapLayersControl />
                <MapTileLayer />
                <MapTileLayer
                    name="No Labels"
                    url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                    darkUrl="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                />
                {PLACES.map((placesGroup) => (
                    <MapLayerGroup
                        key={placesGroup.name}
                        name={placesGroup.name}>
                        {placesGroup.places.map((place) => (
                            <MapMarker
                                key={place.name}
                                position={place.coordinates}
                                icon={place.icon}>
                                <MapPopup className="w-44">
                                    {place.name}
                                </MapPopup>
                            </MapMarker>
                        ))}
                    </MapLayerGroup>
                ))}
            </MapLayers>
        </Map>
    )
}
