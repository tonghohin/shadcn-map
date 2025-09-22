import { Map, MapMarker, MapPopup, MapTileLayer, MapZoomControl } from "@/registry/new-york-v4/ui/map";
import type { LatLngExpression } from "leaflet";

export function MapDemo() {
    const TORONTO_COORDINATES = [43.6532, -79.3832] satisfies LatLngExpression;

    return (
        <Map center={TORONTO_COORDINATES} className="border">
            <MapTileLayer />
            <MapZoomControl />
            <MapMarker position={TORONTO_COORDINATES}>
                <MapPopup>A map component for shadcn/ui.</MapPopup>
            </MapMarker>
        </Map>
    );
}
