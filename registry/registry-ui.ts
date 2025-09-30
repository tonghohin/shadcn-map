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
            "leaflet-draw",
            "next-themes",
        ],
        devDependencies: ["@types/leaflet", "@types/leaflet-draw"],
        registryDependencies: ["button", "dropdown-menu"],
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
                ".leaflet-popup-content-wrapper, .leaflet-popup-content": {
                    "@apply ![all:unset]": {},
                },
                ".leaflet-popup": {
                    "@apply !animate-none": {},
                },
                ".leaflet-popup-close-button": {
                    "@apply ring-offset-background focus:ring-ring bg-secondary rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:outline-hidden":
                        {},
                },
                ".leaflet-tooltip": {
                    "@apply !bg-foreground !text-background !animate-none !rounded-md !border-none !p-0 !px-3 !py-1.5 !shadow-none":
                        {},
                },
                ".leaflet-popup-tip-container, .leaflet-tooltip-top:before, .leaflet-tooltip-bottom:before, .leaflet-tooltip-left:before, .leaflet-tooltip-right:before":
                    {
                        "@apply hidden": {},
                    },
                ".leaflet-control-attribution": {
                    "@apply !bg-muted rounded-md !px-[4px] !py-[2px] text-[10px] !leading-none !text-inherit":
                        {},
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
