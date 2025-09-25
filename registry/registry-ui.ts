import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
    {
        name: "map",
        title: "Map",
        description: "A map component.",
        author: "Hin",
        type: "registry:ui",
        dependencies: ["leaflet", "react-leaflet", "next-themes"],
        devDependencies: ["@types/leaflet"],
        registryDependencies: ["button", "skeleton", "dropdown-menu"],
        files: [
            {
                path: "ui/map.tsx",
                type: "registry:ui",
            },
        ],
    },
]
