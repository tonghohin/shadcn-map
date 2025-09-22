"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton";
import type { DivIconOptions, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LucideProps, MapPinIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import type { MapContainerProps, MarkerProps, PopupProps, TileLayerProps } from "react-leaflet";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(async () => (await import("react-leaflet")).MapContainer, { ssr: false, loading: () => <Skeleton className="size-full" /> });
const TileLayer = dynamic(async () => (await import("react-leaflet")).TileLayer, { ssr: false });
const Marker = dynamic(async () => (await import("react-leaflet")).Marker, { ssr: false });
const Popup = dynamic(async () => (await import("react-leaflet")).Popup, { ssr: false });

function Map({ className, ...props }: MapContainerProps & { center: LatLngExpression }) {
    const INITIAL_ZOOM = 15;

    return <MapContainer zoom={INITIAL_ZOOM} attributionControl={false} zoomControl={false} className={cn("size-full rounded-md", className)} {...props} />;
}

function MapTileLayer({ attribution, url, ...props }: Partial<TileLayerProps>) {
    const { resolvedTheme } = useTheme();
    const style = resolvedTheme === "dark" ? "dark_all" : "light_all";
    const tileUrl = `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}.png`;

    return <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>' url={tileUrl} {...props} />;
}

function MapDefaultMarkerIcon({ ...props }: LucideProps) {
    return <MapPinIcon {...props} />;
}

function MapMarker({ icon, bgPos, iconAnchor, popupAnchor, tooltipAnchor, ...props }: Omit<MarkerProps, "icon"> & Pick<DivIconOptions, "bgPos" | "iconAnchor" | "popupAnchor" | "tooltipAnchor"> & { icon?: ReactNode }) {
    const L = useLeaflet();
    if (!L) return null;

    return (
        <Marker
            icon={L.divIcon({
                html: renderToString(icon ?? <MapDefaultMarkerIcon />),
                ...(bgPos ? { bgPos } : {}),
                ...(iconAnchor ? { iconAnchor } : {}),
                ...(popupAnchor ? { popupAnchor } : {}),
                ...(tooltipAnchor ? { tooltipAnchor } : {})
            })}
            riseOnHover
            {...props}
        />
    );
}

function MapPopup({ className, ...props }: PopupProps) {
    return <Popup className={cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 font-sans shadow-md outline-hidden", className)} {...props} />;
}

function MapZoomControl({ className, ...props }: React.ComponentProps<"div">) {
    const map = useMap();
    const mapZoom = map.getZoom();
    const mapMaxZoom = map.getMaxZoom();
    const mapMinZoom = map.getMinZoom();

    return (
        <div className={cn("absolute top-1 left-1 z-1000 grid gap-1", className)} {...props}>
            <Button type="button" size="icon" variant="outline" disabled={mapZoom >= mapMaxZoom} onClick={() => map.zoomIn()}>
                <PlusIcon />
            </Button>
            <Button type="button" size="icon" variant="outline" disabled={mapZoom <= mapMinZoom} onClick={() => map.zoomOut()}>
                <MinusIcon />
            </Button>
        </div>
    );
}

function useLeaflet() {
    const [L, setL] = useState<typeof import("leaflet") | null>(null);

    useEffect(() => {
        if (L) return;

        if (typeof window !== "undefined") {
            const leaflet = require("leaflet");
            setL(leaflet);
        }
    }, [L]);

    return L;
}

export { Map, MapDefaultMarkerIcon, MapMarker, MapPopup, MapTileLayer, MapZoomControl };
