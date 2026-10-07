import { Map, MapTileLayer } from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithCustomVectorTiles() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression

    return (
        <Map center={TORONTO_COORDINATES} zoom={13}>
            <MapTileLayer
                vectorStyleUrl="https://tiles.openfreemap.org/styles/liberty"
                rasterUrl="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                rasterAttribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
        </Map>
    )
}
