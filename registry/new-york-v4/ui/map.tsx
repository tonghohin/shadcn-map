"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import type { CheckboxItem } from "@radix-ui/react-dropdown-menu"
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
    LayerGroupProps,
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
const LeafletLayerGroup = dynamic(
    async () => (await import("react-leaflet")).LayerGroup,
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

interface MapLayerGroupOption
    extends Pick<React.ComponentProps<typeof CheckboxItem>, "disabled"> {
    name: string
}

interface MapLayersContextType {
    registerTileLayer: (layer: MapTileLayerOption) => void
    tileLayers: MapTileLayerOption[]
    selectedTileLayer: string
    setSelectedTileLayer: (name: string) => void

    registerLayerGroup: (layer: MapLayerGroupOption) => void
    layerGroups: MapLayerGroupOption[]
    activeLayerGroups: string[]
    setActiveLayerGroups: (names: string[]) => void
}

const MapLayersContext = createContext<MapLayersContextType | null>(null)

function useMapLayersContext() {
    return useContext(MapLayersContext)
}

function MapTileLayer({
    name = "Default",
    url,
    attribution,
    darkUrl,
    darkAttribution,
    ...props
}: Partial<TileLayerProps> & {
    name?: string
    darkUrl?: string
    darkAttribution?: string
}) {
    const context = useContext(MapLayersContext)
    const DEFAULT_URL =
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
    const DEFAULT_DARK_URL =
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"

    const { resolvedTheme } = useTheme()
    const resolvedUrl =
        resolvedTheme === "dark"
            ? (darkUrl ?? url ?? DEFAULT_DARK_URL)
            : (url ?? DEFAULT_URL)
    const resolvedAttribution =
        resolvedTheme === "dark" && darkAttribution
            ? darkAttribution
            : (attribution ??
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>')

    useEffect(() => {
        if (context) {
            context.registerTileLayer({
                name,
                url: resolvedUrl,
                attribution: resolvedAttribution,
            })
        }
    }, [context, name, url, attribution])

    if (context && context.selectedTileLayer !== name) {
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

function MapLayerGroup({
    name,
    disabled,
    ...props
}: LayerGroupProps & MapLayerGroupOption) {
    const context = useMapLayersContext()

    useEffect(() => {
        if (context) {
            context.registerLayerGroup({
                name,
                disabled,
            })
        }
    }, [context, name, disabled])

    if (context && !context.activeLayerGroups.includes(name)) {
        return null
    }

    return <LeafletLayerGroup {...props} />
}

function MapLayers({
    defaultTileLayer,
    defaultLayerGroups = [],
    ...props
}: Omit<React.ComponentProps<typeof MapLayersContext.Provider>, "value"> & {
    defaultTileLayer?: string
    defaultLayerGroups?: string[]
}) {
    const [tileLayers, setTileLayers] = useState<MapTileLayerOption[]>([])
    const [selectedTileLayer, setSelectedTileLayer] = useState<string>(
        defaultTileLayer || ""
    )
    const [layerGroups, setLayerGroups] = useState<MapLayerGroupOption[]>([])
    const [activeLayerGroups, setActiveLayerGroups] =
        useState<string[]>(defaultLayerGroups)

    function registerTileLayer(tileLayer: MapTileLayerOption) {
        setTileLayers((prevTileLayers) => {
            if (prevTileLayers.some((layer) => layer.name === tileLayer.name)) {
                return prevTileLayers
            }
            return [...prevTileLayers, tileLayer]
        })
    }

    function registerLayerGroup(layerGroup: MapLayerGroupOption) {
        setLayerGroups((prevLayerGroups) => {
            if (
                prevLayerGroups.some((group) => group.name === layerGroup.name)
            ) {
                return prevLayerGroups
            }
            return [...prevLayerGroups, layerGroup]
        })
    }

    useEffect(() => {
        // Error: Invalid defaultValue
        if (
            defaultTileLayer &&
            tileLayers.length > 0 &&
            !tileLayers.some((tileLayer) => tileLayer.name === defaultTileLayer)
        ) {
            throw new Error(
                `Invalid defaultTileLayer "${defaultTileLayer}" provided to MapLayers. It must match a MapTileLayer's name prop.`
            )
        }

        // Set initial selected tile layer
        if (tileLayers.length > 0 && !selectedTileLayer) {
            const validDefaultValue =
                defaultTileLayer &&
                tileLayers.some((layer) => layer.name === defaultTileLayer)
                    ? defaultTileLayer
                    : tileLayers[0].name
            setSelectedTileLayer(validDefaultValue)
        }

        // Error: Invalid defaultActiveLayerGroups
        if (
            defaultLayerGroups.length > 0 &&
            layerGroups.length > 0 &&
            defaultLayerGroups.some(
                (name) => !layerGroups.some((group) => group.name === name)
            )
        ) {
            throw new Error(
                `Invalid defaultLayerGroups value provided to MapLayers. All names must match a MapLayerGroup's name prop.`
            )
        }
    }, [
        tileLayers,
        defaultTileLayer,
        selectedTileLayer,
        layerGroups,
        defaultLayerGroups,
    ])

    return (
        <MapLayersContext.Provider
            value={{
                registerTileLayer,
                tileLayers,
                selectedTileLayer,
                setSelectedTileLayer,
                registerLayerGroup,
                layerGroups,
                activeLayerGroups,
                setActiveLayerGroups,
            }}
            {...props}
        />
    )
}

function MapLayersControl({
    tileLayersLabel = "Map Type",
    layerGroupsLabel = "Layers",
    className,
    ...props
}: React.ComponentProps<"button"> & {
    tileLayersLabel?: string
    layerGroupsLabel?: string
}) {
    const layersContext = useMapLayersContext()
    if (!layersContext) {
        throw new Error("MapLayersControl must be used within MapLayers")
    }

    const {
        tileLayers,
        selectedTileLayer,
        setSelectedTileLayer,
        layerGroups,
        activeLayerGroups,
        setActiveLayerGroups,
    } = layersContext

    if (tileLayers.length === 0 && layerGroups.length === 0) {
        return null
    }

    function handleLayerGroupToggle(name: string, checked: boolean) {
        setActiveLayerGroups(
            checked
                ? [...activeLayerGroups, name]
                : activeLayerGroups.filter((groupName) => groupName !== name)
        )
    }

    const showTileLayersDropdown = tileLayers.length > 1
    const showLayerGroupsDropdown = layerGroups.length > 0

    if (!showTileLayersDropdown && !showLayerGroupsDropdown) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    aria-label="Select layers"
                    title="Select layers"
                    className={cn("absolute top-1 right-1 z-1000", className)}
                    {...props}>
                    <LayersIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-1000">
                {showTileLayersDropdown && (
                    <>
                        <DropdownMenuLabel>{tileLayersLabel}</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                            value={selectedTileLayer}
                            onValueChange={setSelectedTileLayer}>
                            {tileLayers.map((tileLayer) => (
                                <DropdownMenuRadioItem
                                    key={tileLayer.name}
                                    value={tileLayer.name}>
                                    {tileLayer.name}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </>
                )}
                {showTileLayersDropdown && showLayerGroupsDropdown && (
                    <DropdownMenuSeparator />
                )}
                {showLayerGroupsDropdown && (
                    <>
                        <DropdownMenuLabel>
                            {layerGroupsLabel}
                        </DropdownMenuLabel>
                        {layerGroups.map((layerGroup) => (
                            <DropdownMenuCheckboxItem
                                key={layerGroup.name}
                                checked={activeLayerGroups.includes(
                                    layerGroup.name
                                )}
                                disabled={layerGroup.disabled}
                                onCheckedChange={(checked) =>
                                    handleLayerGroupToggle(
                                        layerGroup.name,
                                        checked
                                    )
                                }>
                                {layerGroup.name}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function MapMarker({
    icon = <MapPinIcon className="size-6" />,
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
            className={cn(
                "absolute top-1 left-1 z-1000 grid size-fit gap-1",
                className
            )}
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
    MapLayerGroup,
    MapLayers,
    MapLayersControl,
    MapLocateControl,
    MapMarker,
    MapPolygon,
    MapPolyline,
    MapPopup,
    MapRectangle,
    MapTileLayer,
    MapTooltip,
    MapZoomControl,
}
