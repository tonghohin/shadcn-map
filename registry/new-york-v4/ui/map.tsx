"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"
import type {
    DivIconOptions,
    ErrorEvent,
    LatLngExpression,
    LocateOptions,
    LocationEvent,
} from "leaflet"
import "leaflet/dist/leaflet.css"
import {
    LayersIcon,
    LoaderCircleIcon,
    LucideProps,
    MapPinIcon,
    MinusIcon,
    NavigationIcon,
    PlusIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react"
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
import { useMap, useMapEvents } from "react-leaflet"

const LeafletMapContainer = dynamic(
    async () => (await import("react-leaflet")).MapContainer,
    {
        ssr: false,
        loading: () => <Skeleton className="size-full" />,
    }
)
const LeafletTileLayer = dynamic(
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
    zoom = 15,
    className,
    ...props
}: MapContainerProps & { center: LatLngExpression }) {
    return (
        <LeafletMapContainer
            zoom={zoom}
            attributionControl={false}
            zoomControl={false}
            className={cn("size-full min-h-96 flex-1 rounded-md", className)}
            {...props}
        />
    )
}

interface MapTileLayerOption {
    name: string
    url: string
    attribution?: string
}

interface MapLayersContextType {
    registerLayer: (layer: MapTileLayerOption) => void
    layers: MapTileLayerOption[]
    selectedLayer: string
    setSelectedLayer: (name: string) => void
}

const MapLayersContext = createContext<MapLayersContextType | null>(null)

function useMapLayersContext() {
    const context = useContext(MapLayersContext)
    if (!context) {
        throw new Error("MapLayersControl must be used within MapTileLayers")
    }
    return context
}

function MapTileLayer({
    name = "Default",
    url,
    attribution,
    ...props
}: Partial<TileLayerProps> & { name?: string }) {
    const context = useContext(MapLayersContext)
    const { resolvedTheme } = useTheme()
    const style = resolvedTheme === "dark" ? "dark_all" : "light_all"
    const resolvedUrl =
        url ?? `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}.png`
    const resolvedAttribution =
        attribution ??
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'

    useEffect(() => {
        if (context) {
            context.registerLayer({
                name,
                url: resolvedUrl,
                attribution: resolvedAttribution,
            })
        }
    }, [context, name, url, attribution])

    if (context && context.selectedLayer !== name) {
        return null
    }

    return (
        <LeafletTileLayer
            url={resolvedUrl}
            attribution={resolvedAttribution}
            {...props}
        />
    )
}

function MapTileLayers({
    defaultValue,
    ...props
}: Omit<React.ComponentProps<typeof MapLayersContext.Provider>, "value"> & {
    defaultValue?: string
}) {
    const [layers, setLayers] = useState<MapTileLayerOption[]>([])
    const [selectedLayer, setSelectedLayer] = useState<string>(
        defaultValue || ""
    )

    function registerLayer(layer: MapTileLayerOption) {
        setLayers((prevLayers) => {
            if (
                prevLayers.some(
                    (existingLayer) => existingLayer.name === layer.name
                )
            ) {
                return prevLayers
            }
            return [...prevLayers, layer]
        })
    }

    useEffect(() => {
        // Error: Invalid defaultValue
        if (
            defaultValue &&
            layers.length > 0 &&
            !layers.some((layer) => layer.name === defaultValue)
        ) {
            throw new Error(
                `Invalid defaultValue "${defaultValue}" provided to MapTileLayers. It must match a MapTileLayer's value prop.`
            )
        }

        // Set initial selected layer
        if (layers.length > 0 && !selectedLayer) {
            const validDefaultValue =
                defaultValue &&
                layers.some((layer) => layer.name === defaultValue)
                    ? defaultValue
                    : layers[0].name
            setSelectedLayer(validDefaultValue)
        }
    }, [layers, defaultValue, selectedLayer])

    return (
        <MapLayersContext.Provider
            value={{ registerLayer, layers, selectedLayer, setSelectedLayer }}
            {...props}
        />
    )
}

function MapLayersControl({
    className,
    ...props
}: React.ComponentProps<"button">) {
    const { layers, selectedLayer, setSelectedLayer } = useMapLayersContext()

    if (layers.length === 0) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    aria-label="Select map type"
                    title="Select map type"
                    className={cn("absolute top-1 right-1 z-1000", className)}
                    {...props}>
                    <LayersIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Map Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={selectedLayer}
                    onValueChange={setSelectedLayer}>
                    {layers.map((layer) => (
                        <DropdownMenuRadioItem
                            key={layer.name}
                            value={layer.name}>
                            {layer.name}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
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

function MapCircle({ className, ...props }: CircleProps) {
    return (
        <LeafletCircle
            className={cn(
                "fill-foreground stroke-foreground stroke-2",
                className
            )}
            {...props}
        />
    )
}

function MapCircleMarker({ className, ...props }: CircleMarkerProps) {
    return (
        <LeafletCircleMarker
            className={cn(
                "fill-foreground stroke-foreground stroke-2",
                className
            )}
            {...props}
        />
    )
}

function MapPolyline({ className, ...props }: PolylineProps) {
    return (
        <LeafletPolyline
            className={cn(
                "fill-foreground stroke-foreground stroke-2",
                className
            )}
            {...props}
        />
    )
}

function MapPolygon({ className, ...props }: PolygonProps) {
    return (
        <LeafletPolygon
            className={cn(
                "fill-foreground stroke-foreground stroke-2",
                className
            )}
            {...props}
        />
    )
}

function MapRectangle({ className, ...props }: RectangleProps) {
    return (
        <LeafletRectangle
            className={cn(
                "fill-foreground stroke-foreground stroke-2",
                className
            )}
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
    const [zoomLevel, setZoomLevel] = useState(map.getZoom())

    useMapEvents({
        zoomend: () => {
            setZoomLevel(map.getZoom())
        },
    })

    return (
        <div
            className={cn("absolute top-1 left-1 z-1000 grid gap-1", className)}
            {...props}>
            <Button
                type="button"
                size="icon"
                variant="secondary"
                aria-label="Zoom in"
                title="Zoom in"
                disabled={zoomLevel >= map.getMaxZoom()}
                onClick={() => map.zoomIn()}>
                <PlusIcon />
            </Button>
            <Button
                type="button"
                size="icon"
                variant="secondary"
                aria-label="Zoom out"
                title="Zoom out"
                disabled={zoomLevel <= map.getMinZoom()}
                onClick={() => map.zoomOut()}>
                <MinusIcon />
            </Button>
        </div>
    )
}

function MapLocatePulseIcon() {
    return (
        <div className="absolute -top-1 -right-1 flex size-3 rounded-full">
            <div className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
            <div className="bg-primary relative inline-flex size-3 rounded-full" />
        </div>
    )
}

function MapLocateControl({
    className,
    watch = false,
    onLocationFound,
    onLocationError,
    ...props
}: React.ComponentProps<"button"> &
    Pick<LocateOptions, "watch"> & {
        onLocationFound?: (location: LocationEvent) => void
        onLocationError?: (error: ErrorEvent) => void
    }) {
    const map = useMap()
    const [isLocating, setIsLocating] = useDebounceLoadingState(200)
    const [position, setPosition] = useState<LatLngExpression | null>(null)

    function startLocating() {
        setIsLocating(true)
        map.locate({ setView: true, maxZoom: map.getMaxZoom(), watch })
        map.on("locationfound", (location: LocationEvent) => {
            setPosition(location.latlng)
            setIsLocating(false)
            onLocationFound?.(location)
        })
        map.on("locationerror", (error: ErrorEvent) => {
            setPosition(null)
            setIsLocating(false)
            onLocationError?.(error)
        })
    }

    function stopLocating() {
        map.stopLocate()
        map.off("locationfound")
        map.off("locationerror")
        setPosition(null)
        setIsLocating(false)
    }

    useEffect(() => {
        return () => stopLocating()
    }, [])

    return (
        <>
            <Button
                type="button"
                size="icon"
                variant={position ? "default" : "secondary"}
                onClick={position ? stopLocating : startLocating}
                disabled={isLocating}
                title={
                    isLocating
                        ? "Locating..."
                        : position
                          ? "Stop tracking"
                          : "Track location"
                }
                aria-label={
                    isLocating
                        ? "Locating..."
                        : position
                          ? "Stop location tracking"
                          : "Start location tracking"
                }
                className={cn("absolute right-1 bottom-1 z-1000", className)}
                {...props}>
                {isLocating ? (
                    <LoaderCircleIcon className="animate-spin" />
                ) : (
                    <NavigationIcon />
                )}
            </Button>
            {position && (
                <MapMarker position={position} icon={<MapLocatePulseIcon />} />
            )}
        </>
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

function useDebounceLoadingState(delay = 200) {
    const [isLoading, setIsLoading] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isLoading) {
            timeoutRef.current = setTimeout(() => {
                setShowLoading(true)
            }, delay)
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            setShowLoading(false)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [isLoading, delay])

    return [showLoading, setIsLoading] as const
}

export {
    Map,
    MapCircle,
    MapCircleMarker,
    MapDefaultMarkerIcon,
    MapLayersControl,
    MapLocateControl,
    MapMarker,
    MapPolygon,
    MapPolyline,
    MapPopup,
    MapRectangle,
    MapTileLayer,
    MapTileLayers,
    MapTooltip,
    MapZoomControl,
}
