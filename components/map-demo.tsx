"use client"

import {
    Map,
    MapCircle,
    MapLayersControl,
    MapLocateControl,
    MapMarker,
    MapPopup,
    MapTileLayer,
    MapTileLayers,
    MapZoomControl,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { toast } from "sonner"

export function MapDemo() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES} className="border">
            <MapTileLayers>
                <MapTileLayer />
                <MapTileLayer
                    name="Satellite"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                />
                <MapLayersControl />
            </MapTileLayers>
            <MapZoomControl />
            <MapLocateControl
                watch
                onLocationError={(error) => toast.error(error.message)}
            />
            <MapMarker position={TORONTO_COORDINATES}>
                <MapPopup>A map component for shadcn/ui.</MapPopup>
            </MapMarker>
            <MapCircle center={TORONTO_COORDINATES} radius={200} />
        </Map>
    )
}
