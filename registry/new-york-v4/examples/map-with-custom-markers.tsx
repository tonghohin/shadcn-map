import {
    Map,
    MapDefaultMarkerIcon,
    MapMarker,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { BrushIcon } from "lucide-react"

export function MapWithCustomMarkers() {
    const places = [
        {
            name: "Matterhorn",
            coordinates: [45.9763, 7.6586] satisfies LatLngExpression,
            icon: <span className="text-sm">🏔️</span>,
        },
        {
            name: "Piazzale Michelangelo",
            coordinates: [43.7629, 11.2658] satisfies LatLngExpression,
            icon: <BrushIcon />,
        },
        {
            name: "Eiffel Tower",
            coordinates: [48.8584, 2.2945] satisfies LatLngExpression,
            icon: <MapDefaultMarkerIcon className="fill-muted-foreground" />,
        },
    ]

    return (
        <Map center={places[0].coordinates} zoom={5}>
            <MapTileLayer />
            {places.map((place) => (
                <MapMarker
                    key={place.name}
                    position={place.coordinates}
                    icon={place.icon}
                />
            ))}
        </Map>
    )
}
