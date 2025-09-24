import {
    Map,
    MapDefaultMarkerIcon,
    MapMarker,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { BrushIcon } from "lucide-react"
import Image from "next/image"

export function MapWithCustomMarkers() {
    const PLACES = [
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
        {
            name: "Colosseum",
            coordinates: [41.8902, 12.4922] satisfies LatLngExpression,
            icon: <Image alt="cat" src="/cat.png" width={16} height={16} />,
        },
    ]

    return (
        <Map center={PLACES[0].coordinates} zoom={5}>
            <MapTileLayer />
            {PLACES.map((place) => (
                <MapMarker
                    key={place.name}
                    position={place.coordinates}
                    icon={place.icon}
                />
            ))}
        </Map>
    )
}
