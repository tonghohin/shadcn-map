import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
    {
        name: "map",
        type: "registry:ui",
        dependencies: ["leaflet", "react-leaflet", "next-themes"],
        devDependencies: ["@types/leaflet"],
        registryDependencies: ["button", "skeleton"],
        files: [
            {
                path: "ui/map.tsx",
                type: "registry:ui",
            },
        ],
    },
]
