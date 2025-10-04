"use client"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
    Map,
    MapDrawCircle,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit,
    MapDrawMarker,
    MapDrawPolygon,
    MapDrawPolyline,
    MapDrawRectangle,
    MapDrawUndo,
    MapTileLayer,
    useLeaflet,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { useState } from "react"

export function MapWithDrawControlCallback() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    const { L } = useLeaflet()
    const [numberOfShapes, setNumberOfShapes] = useState(0)

    return L ? (
        <Map center={TORONTO_COORDINATES}>
            <MapTileLayer />
            <MapDrawControl
                onLayersChange={(layers) => {
                    setNumberOfShapes(layers.getLayers().length)
                    layers.eachLayer((layer) => {
                        if (layer instanceof L.Marker) {
                            console.log("Marker:", layer.getLatLng())
                        } else if (
                            layer instanceof L.Polyline &&
                            !(layer instanceof L.Polygon)
                        ) {
                            console.log("Polyline:", layer.getLatLngs())
                        } else if (layer instanceof L.Circle) {
                            console.log(
                                "Circle center:",
                                layer.getLatLng(),
                                "radius:",
                                layer.getRadius()
                            )
                        } else if (layer instanceof L.Rectangle) {
                            console.log("Rectangle bounds:", layer.getBounds())
                        } else if (layer instanceof L.Polygon) {
                            console.log("Polygon:", layer.getLatLngs())
                        }
                    })
                }}>
                <MapDrawMarker />
                <MapDrawPolyline />
                <MapDrawCircle />
                <MapDrawRectangle />
                <MapDrawPolygon />
                <MapDrawEdit />
                <MapDrawDelete />
                <MapDrawUndo />
            </MapDrawControl>
            <Badge className="absolute right-1 bottom-1 z-1000">
                Shapes: {numberOfShapes}
            </Badge>
        </Map>
    ) : null
}
