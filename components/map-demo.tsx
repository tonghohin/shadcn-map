"use client"

import {
    Map,
    MapCircleMarker,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit,
    MapDrawPolygon,
    MapDrawPolyline,
    MapDrawUndo,
    MapLayerGroup,
    MapLayers,
    MapLayersControl,
    MapLocateControl,
    MapMarker,
    MapPopup,
    MapTileLayer,
    MapZoomControl,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { toast } from "sonner"

export function MapDemo() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES} attributionControl className="border">
            <MapLayers defaultLayerGroups={["Pin", "Area"]}>
                <MapLayersControl />
                <MapTileLayer />
                <MapTileLayer
                    name="Satellite"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                />
                <MapLayerGroup name="Pin">
                    <MapMarker position={TORONTO_COORDINATES}>
                        <MapPopup>A map component for shadcn/ui.</MapPopup>
                    </MapMarker>
                </MapLayerGroup>
                <MapLayerGroup name="Area">
                    <MapCircleMarker center={TORONTO_COORDINATES} radius={80} />
                </MapLayerGroup>
            </MapLayers>
            <MapZoomControl />
            <MapLocateControl
                watch
                onLocationError={(error) => toast.error(error.message)}
                className="bottom-5"
            />
            <MapDrawControl>
                <MapDrawPolyline />
                <MapDrawPolygon allowIntersection={false} />
                <MapDrawEdit />
                <MapDrawDelete />
                <MapDrawUndo />
            </MapDrawControl>
        </Map>
    )
}
