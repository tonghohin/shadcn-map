import {
    Map,
    MapControlContainer,
    MapMarker,
    MapTileLayer,
} from "@/registry/new-york-v4/ui/map"
import type { LatLngExpression } from "leaflet"
import { CircleIcon } from "lucide-react"

export function MapWithCustomControlContainer() {
    const STATUS_CLASS_NAME = {
        active: "text-green-700 fill-green-700",
        inactive: "text-destructive fill-destructive",
        warning: "text-yellow-600 fill-yellow-600",
    }
    const LOCATIONS = [
        {
            id: 1,
            coordinates: [40.785091, -73.968285],
            status: "active",
        },
        {
            id: 2,
            coordinates: [40.758896, -73.98513],
            status: "inactive",
        },
        {
            id: 3,
            coordinates: [40.748817, -73.985428],
            status: "warning",
        },
    ] satisfies {
        id: number
        coordinates: LatLngExpression
        status: "active" | "inactive" | "warning"
    }[]

    return (
        <Map center={LOCATIONS[1].coordinates} zoom={12}>
            <MapTileLayer />
            {LOCATIONS.map((location) => (
                <MapMarker
                    key={location.id}
                    position={location.coordinates}
                    icon={
                        <CircleIcon
                            size={8}
                            className={STATUS_CLASS_NAME[location.status]}
                        />
                    }
                />
            ))}
            <MapControlContainer className="bg-popover text-popover-foreground bottom-1 left-1 flex flex-col gap-2 rounded-md border p-2 shadow">
                {(["active", "inactive", "warning"] as const).map((status) => (
                    <p key={status} className="flex items-center gap-2">
                        <CircleIcon
                            size={8}
                            className={STATUS_CLASS_NAME[status]}
                        />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </p>
                ))}
            </MapControlContainer>
        </Map>
    )
}
