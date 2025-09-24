"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"
import type { DivIconOptions, LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import { LucideProps, MapPinIcon, MinusIcon, PlusIcon } from "lucide-react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { useEffect, useState, type ReactNode } from "react"
import { renderToString } from "react-dom/server"
import type {
    CircleMarkerProps,
    CircleProps,
    MapContainerProps,
    MarkerProps,
    PolygonProps,
    PolylineProps,
    PopupProps,
    RectangleProps,
    TileLayerProps,
    TooltipProps,
} from "react-leaflet"
import { useMap } from "react-leaflet"

const MapContainer = dynamic(
    async () => (await import("react-leaflet")).MapContainer,
    {
        ssr: false,
        loading: () => <Skeleton className="size-full" />,
    }
)
const TileLayer = dynamic(
    async () => (await import("react-leaflet")).TileLayer,
    { ssr: false }
)
const LeafletMarker = dynamic(
    async () => (await import("react-leaflet")).Marker,
    {
        ssr: false,
    }
)
const LeafletPopup = dynamic(
    async () => (await import("react-leaflet")).Popup,
    {
        ssr: false,
    }
)
const LeafletTooltip = dynamic(
    async () => (await import("react-leaflet")).Tooltip,
    {
        ssr: false,
    }
)
const LeafletCircle = dynamic(
    async () => (await import("react-leaflet")).Circle,
    {
        ssr: false,
    }
)
const LeafletCircleMarker = dynamic(
    async () => (await import("react-leaflet")).CircleMarker,
    {
        ssr: false,
    }
)
const LeafletPolyline = dynamic(
    async () => (await import("react-leaflet")).Polyline,
    {
        ssr: false,
    }
)
const LeafletPolygon = dynamic(
    async () => (await import("react-leaflet")).Polygon,
    {
        ssr: false,
    }
)
const LeafletRectangle = dynamic(
    async () => (await import("react-leaflet")).Rectangle,
    {
        ssr: false,
    }
)

function Map({
    className,
    ...props
}: MapContainerProps & { center: LatLngExpression }) {
    const INITIAL_ZOOM = 15

    return (
        <MapContainer
            zoom={INITIAL_ZOOM}
            attributionControl={false}
            zoomControl={false}
            className={cn("size-full flex-1 rounded-md", className)}
            {...props}
        />
    )
}

function MapTileLayer({ attribution, url, ...props }: Partial<TileLayerProps>) {
    const { resolvedTheme } = useTheme()
    const style = resolvedTheme === "dark" ? "dark_all" : "light_all"
    const tileUrl = `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}.png`

    return (
        <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={tileUrl}
            {...props}
        />
    )
}

function MapDefaultMarkerIcon({ ...props }: LucideProps) {
    return <MapPinIcon className="size-6" {...props} />
}

function MapMarker({
    icon = <MapDefaultMarkerIcon />,
    bgPos,
    iconAnchor = [12, 12],
    popupAnchor,
    tooltipAnchor,
    ...props
}: Omit<MarkerProps, "icon"> &
    Pick<
        DivIconOptions,
        "bgPos" | "iconAnchor" | "popupAnchor" | "tooltipAnchor"
    > & {
        icon?: ReactNode
    }) {
    const L = useLeaflet()
    if (!L) return null

    return (
        <LeafletMarker
            icon={L.divIcon({
                html: renderToString(icon),
                iconAnchor,
                ...(bgPos ? { bgPos } : {}),
                ...(popupAnchor ? { popupAnchor } : {}),
                ...(tooltipAnchor ? { tooltipAnchor } : {}),
            })}
            riseOnHover
            {...props}
        />
    )
}

function MapPopup({ className, ...props }: PopupProps) {
    return (
        <LeafletPopup
            className={cn(
                "bg-popover text-popover-foreground animate-in fade-out-0 fade-in-0 zoom-out-95 zoom-in-95 slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 font-sans shadow-md outline-hidden",
                className
            )}
            {...props}
        />
    )
}

function MapTooltip({
    className,
    children,
    direction = "top",
    ...props
}: TooltipProps & { direction?: "top" | "right" | "bottom" | "left" }) {
    const ARROW_POSITION_CLASSES = {
        top: "bottom-0.5 left-1/2 -translate-x-1/2 translate-y-1/2",
        bottom: "top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2",
        left: "right-0.5 top-1/2 translate-x-1/2 -translate-y-1/2",
        right: "left-0.5 top-1/2 -translate-x-1/2 -translate-y-1/2",
    }

    return (
        <LeafletTooltip
            className={cn(
                "animate-in fade-in-0 zoom-in-95 fade-out-0 zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 w-fit text-xs text-balance transition-opacity",
                className
            )}
            direction={direction}
            data-side={direction}
            opacity={1}
            {...props}>
            {children}
            <div
                className={cn(
                    "bg-foreground fill-foreground absolute z-50 size-2.5 rotate-45 rounded-[2px]",
                    ARROW_POSITION_CLASSES[direction]
                )}
            />
        </LeafletTooltip>
    )
}

function MapZoomControl({ className, ...props }: React.ComponentProps<"div">) {
    const map = useMap()
    const mapZoom = map.getZoom()
    const mapMaxZoom = map.getMaxZoom()
    const mapMinZoom = map.getMinZoom()

    return (
        <div
            className={cn("absolute top-1 left-1 z-1000 grid gap-1", className)}
            {...props}>
            <Button
                type="button"
                size="icon"
                variant="outline"
                disabled={mapZoom >= mapMaxZoom}
                onClick={() => map.zoomIn()}>
                <PlusIcon />
            </Button>
            <Button
                type="button"
                size="icon"
                variant="outline"
                disabled={mapZoom <= mapMinZoom}
                onClick={() => map.zoomOut()}>
                <MinusIcon />
            </Button>
        </div>
    )
}

function MapCircle({ className, ...props }: CircleProps) {
    return (
        <LeafletCircle
            className="fill-foreground stroke-foreground stroke-2"
            {...props}
        />
    )
}

function MapCircleMarker({ className, ...props }: CircleMarkerProps) {
    return (
        <LeafletCircleMarker
            className="fill-foreground stroke-foreground stroke-2"
            {...props}
        />
    )
}

function MapPolyline({ className, ...props }: PolylineProps) {
    return (
        <LeafletPolyline
            className="fill-foreground stroke-foreground stroke-2"
            {...props}
        />
    )
}

function MapPolygon({ className, ...props }: PolygonProps) {
    return (
        <LeafletPolygon
            className="fill-foreground stroke-foreground stroke-2"
            {...props}
        />
    )
}

function MapRectangle({ className, ...props }: RectangleProps) {
    return (
        <LeafletRectangle
            className="fill-foreground stroke-foreground stroke-2"
            {...props}
        />
    )
}

function useLeaflet() {
    const [L, setL] = useState<typeof import("leaflet") | null>(null)

    useEffect(() => {
        if (L) return

        if (typeof window !== "undefined") {
            const leaflet = require("leaflet")
            setL(leaflet)
        }
    }, [L])

    return L
}

export {
    Map,
    MapCircle,
    MapCircleMarker,
    MapDefaultMarkerIcon,
    MapMarker,
    MapPolygon,
    MapPolyline,
    MapPopup,
    MapRectangle,
    MapTileLayer,
    MapTooltip,
    MapZoomControl,
}
