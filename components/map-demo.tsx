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
    MapFullscreenControl,
    MapLayerGroup,
    MapLayers,
    MapLayersControl,
    MapLocateControl,
    MapMarker,
    MapMarkerClusterGroup,
    MapPopup,
    MapSearchControl,
    MapTileLayer,
    MapZoomControl,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { MapPinIcon, PinIcon } from "lucide-react"
import React from "react"
import { useMap } from "react-leaflet"
import { toast } from "sonner"

export function MapDemo() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression
    const CLUSTER_HUBS = [
        { center: [43.9232, -79.9932], count: 110 },
        { center: [44.1015, -79.1111], count: 30 },
        { center: [43.2532, -78.9002], count: 18 },
        { center: [43.1759, -79.8011], count: 7 },
    ]
    const CLUSTER_POINTS = CLUSTER_HUBS.flatMap((hub, hubIndex) => {
        return Array.from({ length: hub.count }, (_, i) => {
            const id = `${hubIndex}-${i}`
            const latitudeOffset =
                (Math.sin(hubIndex * 100 + i * 12.9898) * 43758.5453) % 1
            const longitudeOffset =
                (Math.sin(hubIndex * 100 + i * 78.233) * 43758.5453) % 1
            return {
                id,
                position: [
                    hub.center[0] + latitudeOffset * 0.02,
                    hub.center[1] + longitudeOffset * 0.02,
                ] satisfies LatLngExpression,
            }
        })
    })

    return (
        <Map
            center={TORONTO_COORDINATES}
            zoom={8}
            attributionControl
            className="border">
            <MapLayers defaultLayerGroups={["Pin", "Area", "Clustered"]}>
                <div className="absolute top-1 right-1 z-1000 grid gap-1">
                    <MapLayersControl className="static" />
                    <MapFullscreenControl className="static" />
                </div>
                <MapTileLayer />
                <MapTileLayer
                    name="Satellite"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                />
                <MapLayerGroup name="Pin">
                    <MapMarker
                        position={TORONTO_COORDINATES}
                        icon={<PinIcon />}>
                        <MapPopup>A map component for shadcn/ui.</MapPopup>
                    </MapMarker>
                </MapLayerGroup>
                <MapLayerGroup name="Area">
                    <MapCircleMarker center={TORONTO_COORDINATES} radius={80} />
                </MapLayerGroup>
                <MapLayerGroup name="Clustered">
                    <MapMarkerClusterGroup>
                        {CLUSTER_POINTS.map((point) => (
                            <MapMarker
                                key={point.id}
                                position={point.position}
                            />
                        ))}
                    </MapMarkerClusterGroup>
                </MapLayerGroup>
            </MapLayers>
            <MapSearchControlWrapper />
            <div className="absolute right-1 bottom-5 z-1000 grid gap-1">
                <MapLocateControl
                    className="static"
                    watch
                    onLocationError={(error) => toast.error(error.message)}
                />
                <MapZoomControl className="static" />
            </div>
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
