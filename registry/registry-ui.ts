import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
    {
        name: "map",
        title: "Map",
        description: "A map component.",
        author: "Hin",
        type: "registry:ui",
        dependencies: [
            "leaflet",
            "react-leaflet",
            "react-leaflet-markercluster",
            "leaflet-draw",
            "next-themes",
        ],
        devDependencies: ["@types/leaflet", "@types/leaflet-draw"],
        registryDependencies: ["button", "button-group", "dropdown-menu"],
        css: {
            "@layer base": {
                ".leaflet-container": {
                    "@apply !bg-card !font-[inherit]": {},
                },
                ".leaflet-container a": {
                    "@apply !text-inherit": {},
                },
                ".leaflet-div-icon": {
                    "@apply !bg-transparent !border-none": {},
                },
                ".leaflet-popup-content-wrapper, .leaflet-popup-content, .leaflet-popup-content p":
                    {
                        "@apply ![all:unset]": {},
                    },
                ".leaflet-popup": {
                    "@apply !animate-none": {},
                },
                ".leaflet-popup-close-button": {
                    "@apply ring-offset-background focus:ring-ring bg-secondary rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:outline-hidden":
                        {},
                },
                ".leaflet-tooltip, .leaflet-draw-tooltip": {
                    "@apply !bg-foreground !text-background !animate-none !rounded-md !border-none !p-0 !px-3 !py-1.5 !shadow-none":
                        {},
                },
                ".leaflet-draw-tooltip:before": {
                    "@apply bg-foreground !top-1/2 !right-0.5 size-2.5 translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] !border-none":
                        {},
                },
                ".leaflet-error-draw-tooltip": {
                    "@apply !bg-destructive !text-white": {},
                },
                ".leaflet-error-draw-tooltip:before": {
                    "@apply bg-destructive": {},
                },
                ".leaflet-draw-tooltip-subtext": {
                    "@apply !text-background": {},
                },
                ".leaflet-popup-tip-container, .leaflet-tooltip-top:before, .leaflet-tooltip-bottom:before, .leaflet-tooltip-left:before, .leaflet-tooltip-right:before":
                    {
                        "@apply hidden": {},
                    },
                ".leaflet-control-attribution": {
                    "@apply !bg-muted rounded-md !px-[4px] !py-[2px] text-[10px] !leading-none !text-inherit":
                        {},
                },
                ".leaflet-draw-guide-dash": {
                    "@apply rounded-full": {},
                },
                ".leaflet-edit-marker-selected": {
                    "@apply !border-transparent !bg-transparent": {},
                },
                ".marker-cluster div": {
                    "@apply font-[inherit]": {},
                },
            },
        },
        files: [
            {
                path: "ui/map.tsx",
                type: "registry:ui",
            },
        ],
    },
]
