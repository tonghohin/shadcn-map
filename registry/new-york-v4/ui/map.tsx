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
    Draw,
    DrawEvents,
    DrawMap,
    DrawOptions,
    EditToolbar,
    ErrorEvent,
    LatLngExpression,
    LocateOptions,
    LocationEvent,
} from "leaflet"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet/dist/leaflet.css"
import {
    CircleIcon,
    EditIcon,
    LayersIcon,
    LoaderCircleIcon,
    MapPinIcon,
    MinusIcon,
    NavigationIcon,
    PentagonIcon,
    PlusIcon,
    SquareIcon,
    Trash2Icon,
    Undo2Icon,
    WaypointsIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
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
    { ssr: false }
)
const LeafletTileLayer = dynamic(
    async () => (await import("react-leaflet")).TileLayer,
    { ssr: false }
)
const LeafletMarker = dynamic(
    async () => (await import("react-leaflet")).Marker,
    { ssr: false }
)
const LeafletPopup = dynamic(
    async () => (await import("react-leaflet")).Popup,
    { ssr: false }
)
const LeafletTooltip = dynamic(
    async () => (await import("react-leaflet")).Tooltip,
    { ssr: false }
)
const LeafletCircle = dynamic(
    async () => (await import("react-leaflet")).Circle,
    { ssr: false }
)
const LeafletCircleMarker = dynamic(
    async () => (await import("react-leaflet")).CircleMarker,
    { ssr: false }
)
const LeafletPolyline = dynamic(
    async () => (await import("react-leaflet")).Polyline,
    { ssr: false }
)
const LeafletPolygon = dynamic(
    async () => (await import("react-leaflet")).Polygon,
    { ssr: false }
)
const LeafletRectangle = dynamic(
    async () => (await import("react-leaflet")).Rectangle,
    { ssr: false }
)
const LeafletLayerGroup = dynamic(
    async () => (await import("react-leaflet")).LayerGroup,
    { ssr: false }
)
const LeafletFeatureGroup = dynamic(
    async () => (await import("react-leaflet")).FeatureGroup,
    { ssr: false }
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
    const map = useMap()
    if (map.attributionControl) {
        map.attributionControl.setPrefix("")
    }

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

function MapFeatureGroup({
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

    return <LeafletFeatureGroup {...props} />
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
    const { L } = useLeaflet()
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

type MapDrawMode = "marker" | "polyline" | "circle" | "rectangle" | "polygon"
type MapDrawAction = "edit" | "delete"
type MapDrawState = MapDrawMode | MapDrawAction | null
interface MapDrawContextType {
    featureGroup: L.FeatureGroup | null
    activeTool: MapDrawState
    setActiveTool: (mode: MapDrawState) => void
}

const MapDrawContext = createContext<MapDrawContextType | null>(null)

function useMapDrawContext() {
    return useContext(MapDrawContext)
}

function MapDrawControl({
    className,
    onLayersChange,
    ...props
}: React.ComponentProps<"div"> & {
    onLayersChange?: (layers: L.FeatureGroup) => void
}) {
    const { L, LeafletDraw } = useLeaflet()
    const map = useMap()
    const featureGroupRef = useRef<L.FeatureGroup | null>(null)
    const [activeTool, setActiveTool] = useState<MapDrawState>(null)

    function handleDrawCreated(event: DrawEvents.Created) {
        if (!featureGroupRef.current) return
        const { layer } = event
        featureGroupRef.current.addLayer(layer)
        onLayersChange?.(featureGroupRef.current)
        setActiveTool(null)
    }

    function handleDrawEditedOrDeleted() {
        if (!featureGroupRef.current) return
        onLayersChange?.(featureGroupRef.current)
        setActiveTool(null)
    }

    useEffect(() => {
        if (!L || !LeafletDraw) return

        map.on(
            L.Draw.Event.CREATED,
            handleDrawCreated as L.LeafletEventHandlerFn
        )
        map.on(L.Draw.Event.EDITED, handleDrawEditedOrDeleted)
        map.on(L.Draw.Event.DELETED, handleDrawEditedOrDeleted)

        return () => {
            map.off(
                L.Draw.Event.CREATED,
                handleDrawCreated as L.LeafletEventHandlerFn
            )
            map.off(L.Draw.Event.EDITED, handleDrawEditedOrDeleted)
            map.off(L.Draw.Event.DELETED, handleDrawEditedOrDeleted)
        }
    }, [L, LeafletDraw, map, onLayersChange])

    return (
        <MapDrawContext.Provider
            value={{
                featureGroup: featureGroupRef.current,
                activeTool,
                setActiveTool,
            }}>
            <LeafletFeatureGroup ref={featureGroupRef} />
            <div
                className={cn(
                    "absolute bottom-1 left-1 z-1000 grid gap-1",
                    className
                )}
                {...props}
            />
        </MapDrawContext.Provider>
    )
}

function MapDrawMarker({ ...props }: DrawOptions.MarkerOptions) {
    const drawContext = useMapDrawContext()
    if (!drawContext) {
        throw new Error("MapDrawMarker must be used within MapDrawControl")
    }
    const { L } = useLeaflet()
    const map = useMap()
    const controlRef = useRef<Draw.Marker | null>(null)
    const { activeTool, setActiveTool } = drawContext
    const isActive = activeTool === "marker"

    const markerIcon = useMemo(() => {
        if (!L) return null
        return L.divIcon({
            iconAnchor: [12, 12],
            html: renderToString(<MapPinIcon className="size-6" />),
        })
    }, [L])

    useEffect(() => {
        if (!L || !markerIcon) return
        if (isActive) {
            const control = new L.Draw.Marker(map as DrawMap, {
                icon: markerIcon,
                ...props,
            })
            control.enable()
            controlRef.current = control
        } else {
            controlRef.current?.disable()
            controlRef.current = null
        }
    }, [isActive, L, map, markerIcon, props])

    function handleClick() {
        setActiveTool(isActive ? null : "marker")
    }

    return (
        <Button
            type="button"
            size="icon"
            aria-label="Draw marker"
            title="Draw marker"
            variant={isActive ? "default" : "secondary"}
            disabled={activeTool === "edit" || activeTool === "delete"}
            onClick={handleClick}>
            <MapPinIcon />
        </Button>
    )
}

function MapDrawPolyline({
    showLength = false,
    drawError = {
        color: "var(--color-destructive)",
    },
    shapeOptions = {
        color: "var(--color-primary)",
        opacity: 1,
        weight: 2,
    },
    ...props
}: DrawOptions.PolylineOptions) {
    const drawContext = useMapDrawContext()
    if (!drawContext) {
        throw new Error("MapDrawPolyline must be used within MapDrawControl")
    }
    const { L } = useLeaflet()
    const map = useMap()
    const controlRef = useRef<Draw.Polyline | null>(null)
    const { activeTool, setActiveTool } = drawContext
    const isActive = activeTool === "polyline"

    const drawIcon = useMemo(() => {
        if (!L) return null
        return L.divIcon({
            iconAnchor: [8, 8],
            html: renderToString(
                <CircleIcon className="fill-primary size-4 transition-transform hover:scale-125" />
            ),
        })
    }, [L])

    useEffect(() => {
        if (!L || !drawIcon) return
        if (isActive) {
            const control = new L.Draw.Polyline(map as DrawMap, {
                icon: drawIcon,
                showLength,
                drawError,
                shapeOptions,
                ...props,
            })
            control.enable()
            controlRef.current = control
        } else {
            controlRef.current?.disable()
            controlRef.current = null
        }
    }, [isActive, L, map, drawIcon, props])

    function handleClick() {
        setActiveTool(isActive ? null : "polyline")
    }

    return (
        <Button
            type="button"
            size="icon"
            aria-label="Draw polyline"
            title="Draw polyline"
            variant={isActive ? "default" : "secondary"}
            disabled={activeTool === "edit" || activeTool === "delete"}
            onClick={handleClick}>
            <WaypointsIcon />
        </Button>
    )
}

function MapDrawCircle({
    showRadius = false,
    shapeOptions = {
        color: "var(--color-primary)",
        opacity: 1,
        weight: 2,
    },
    ...props
}: DrawOptions.CircleOptions) {
    const drawContext = useMapDrawContext()
    if (!drawContext) {
        throw new Error("MapDrawCircle must be used within MapDrawControl")
    }
    const { L } = useLeaflet()
    const map = useMap()
    const controlRef = useRef<Draw.Circle | null>(null)
    const { activeTool, setActiveTool } = drawContext
    const isActive = activeTool === "circle"

    useEffect(() => {
        if (!L) return
        if (isActive) {
            const control = new L.Draw.Circle(map as DrawMap, {
                showRadius,
                shapeOptions,
                ...props,
            })
            control.enable()
            controlRef.current = control
        } else {
            controlRef.current?.disable()
            controlRef.current = null
        }
    }, [isActive, L, map, props])

    function handleClick() {
        setActiveTool(isActive ? null : "circle")
    }

    return (
        <Button
            type="button"
            size="icon"
            aria-label="Draw circle"
            title="Draw circle"
            variant={isActive ? "default" : "secondary"}
            disabled={activeTool === "edit" || activeTool === "delete"}
            onClick={handleClick}>
            <CircleIcon />
        </Button>
    )
}

function MapDrawRectangle({
    showArea = false,
    shapeOptions = {
        color: "var(--color-primary)",
        opacity: 1,
        weight: 2,
    },
    ...props
}: DrawOptions.RectangleOptions) {
    const drawContext = useMapDrawContext()
    if (!drawContext) {
        throw new Error("MapDrawRectangle must be used within MapDrawControl")
    }
    const { L } = useLeaflet()
    const map = useMap()
    const controlRef = useRef<Draw.Rectangle | null>(null)
    const { activeTool, setActiveTool } = drawContext
    const isActive = activeTool === "rectangle"

    useEffect(() => {
        if (!L) return

        if (isActive) {
            const control = new L.Draw.Rectangle(map as DrawMap, {
                showArea,
                shapeOptions,
                ...props,
            })
            control.enable()
            controlRef.current = control
        } else {
            controlRef.current?.disable()
            controlRef.current = null
        }
    }, [isActive, L, map, props])

    function handleClick() {
        setActiveTool(isActive ? null : "rectangle")
    }

    return (
        <Button
            type="button"
            size="icon"
            aria-label="Draw rectangle"
            title="Draw rectangle"
            variant={isActive ? "default" : "secondary"}
            disabled={activeTool === "edit" || activeTool === "delete"}
            onClick={handleClick}>
            <SquareIcon />
        </Button>
    )
}

function MapDrawPolygon({
    drawError = {
        color: "var(--color-destructive)",
    },
    shapeOptions = {
        color: "var(--color-primary)",
        opacity: 1,
        weight: 2,
    },
    ...props
}: DrawOptions.PolygonOptions) {
    const drawContext = useMapDrawContext()
    if (!drawContext) {
        throw new Error("MapDrawPolygon must be used within MapDrawControl")
    }
    const { L } = useLeaflet()
    const map = useMap()
    const controlRef = useRef<Draw.Polygon | null>(null)
    const { activeTool, setActiveTool } = drawContext
    const isActive = activeTool === "polygon"

    const drawIcon = useMemo(() => {
        if (!L) return null
        return L.divIcon({
            iconAnchor: [8, 8],
            html: renderToString(
                <CircleIcon className="fill-primary size-4 transition-transform hover:scale-125" />
            ),
        })
    }, [L])

    useEffect(() => {
        if (!L || !drawIcon) return

        if (isActive) {
            const control = new L.Draw.Polygon(map as DrawMap, {
                icon: drawIcon,
                drawError,
                shapeOptions,
                ...props,
            })
            control.enable()
            controlRef.current = control
        } else {
            controlRef.current?.disable()
            controlRef.current = null
        }
    }, [isActive, L, map, drawIcon, props])

    function handleClick() {
        setActiveTool(isActive ? null : "polygon")
    }

    return (
        <Button
            type="button"
            size="icon"
            aria-label="Draw polygon"
            title="Draw polygon"
            variant={isActive ? "default" : "secondary"}
            disabled={activeTool === "edit" || activeTool === "delete"}
            onClick={handleClick}>
            <PentagonIcon />
        </Button>
    )
}

function MapDrawEdit({
    selectedPathOptions = {
        color: "var(--color-primary)",
        fillColor: "var(--color-primary)",
        weight: 2,
    },
    ...props
}: Omit<EditToolbar.EditHandlerOptions, "featureGroup">) {
    const drawContext = useMapDrawContext()
    if (!drawContext) {
        throw new Error("MapDrawEdit must be used within MapDrawControl")
    }
    const { L } = useLeaflet()
    const map = useMap()
    const controlRef = useRef<EditToolbar.Edit | null>(null)
    const { featureGroup, activeTool, setActiveTool } = drawContext
    const isActive = activeTool === "edit"
    const hasDrawnFeatures = featureGroup && featureGroup.getLayers().length > 0

    const drawIcon = useMemo(() => {
        if (!L) return null
        return L.divIcon({
            iconAnchor: [8, 8],
            html: renderToString(
                <CircleIcon className="fill-primary size-4 transition-transform hover:scale-125" />
            ),
        })
    }, [L])

    useEffect(() => {
        if (!L || !drawIcon || !featureGroup) return

        L.Edit.PolyVerticesEdit.mergeOptions({
            icon: drawIcon,
            touchIcon: drawIcon,
        })
        L.Edit.SimpleShape.mergeOptions({
            moveIcon: drawIcon,
            resizeIcon: drawIcon,
            touchMoveIcon: drawIcon,
            touchResizeIcon: drawIcon,
        })
        L.drawLocal.edit.handlers.edit.tooltip.subtext = ""

        if (isActive) {
            const control = new L.EditToolbar.Edit(map as DrawMap, {
                featureGroup,
                selectedPathOptions,
                ...props,
            })
            control.enable()
            controlRef.current = control
        } else {
            controlRef.current?.save()
            controlRef.current?.disable()
            controlRef.current = null
        }
    }, [isActive, L, map, drawIcon, props])

    function handleClick() {
        setActiveTool(isActive ? null : "edit")
    }

    function handleUndo() {
        controlRef.current?.revertLayers()
        setActiveTool(null)
    }
    return (
        <div className="flex gap-1">
            <Button
                type="button"
                size="icon"
                aria-label="Edit features"
                title="Edit features"
                variant={isActive ? "default" : "secondary"}
                disabled={!hasDrawnFeatures}
                onClick={handleClick}>
                <EditIcon />
            </Button>
            {isActive && (
                <Button
                    type="button"
                    size="icon"
                    aria-label="Undo edit"
                    title="Undo edit"
                    variant="outline"
                    onClick={handleUndo}>
                    <Undo2Icon />
                </Button>
            )}
        </div>
    )
}

function MapDrawDelete() {
    const drawContext = useMapDrawContext()
    if (!drawContext) {
        throw new Error("MapDrawDelete must be used within MapDrawControl")
    }
    const { L } = useLeaflet()
    const map = useMap()
    const controlRef = useRef<EditToolbar.Delete | null>(null)
    const { featureGroup, activeTool, setActiveTool } = drawContext
    const isActive = activeTool === "delete"
    const hasDrawnFeatures = featureGroup && featureGroup.getLayers().length > 0

    useEffect(() => {
        if (!L || !featureGroup) return

        if (isActive) {
            const control = new L.EditToolbar.Delete(map as DrawMap, {
                featureGroup,
            })
            control.enable()
            controlRef.current = control
        } else {
            controlRef.current?.save()
            controlRef.current?.disable()
            controlRef.current = null
        }
    }, [isActive, L, map])

    function handleClick() {
        setActiveTool(isActive ? null : "delete")
    }

    function handleUndo() {
        controlRef.current?.revertLayers()
        setActiveTool(null)
    }
    return (
        <div className="flex gap-1">
            <Button
                type="button"
                size="icon"
                aria-label="Delete features"
                title="Delete features"
                variant={isActive ? "default" : "secondary"}
                disabled={!hasDrawnFeatures}
                onClick={handleClick}>
                <Trash2Icon />
            </Button>
            {isActive && (
                <Button
                    type="button"
                    size="icon"
                    aria-label="Undo delete"
                    title="Undo delete"
                    variant="outline"
                    onClick={handleUndo}>
                    <Undo2Icon />
                </Button>
            )}
        </div>
    )
}

function useLeaflet() {
    const [L, setL] = useState<typeof import("leaflet") | null>(null)
    const [LeafletDraw, setLeafletDraw] = useState<
        typeof import("leaflet-draw") | null
    >(null)

    useEffect(() => {
        if (L && LeafletDraw) return
        if (typeof window !== "undefined") {
            if (!L) {
                setL(require("leaflet"))
            }
            if (!LeafletDraw) {
                setLeafletDraw(require("leaflet-draw"))
            }
        }
    }, [L, LeafletDraw])

    return { L, LeafletDraw }
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
    MapDrawCircle,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit,
    MapDrawMarker,
    MapDrawPolygon,
    MapDrawPolyline,
    MapDrawRectangle,
    MapFeatureGroup,
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
