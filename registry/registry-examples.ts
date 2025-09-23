import { type Registry } from "shadcn/schema"

export const examples: Registry["items"] = [
    {
        name: "basic-map",
        type: "registry:example",
        registryDependencies: ["map"],
        files: [
            {
                path: "examples/basic-map.tsx",
                type: "registry:example",
            },
        ],
    },
    {
        name: "map-with-markers",
        type: "registry:example",
        registryDependencies: ["map"],
        files: [
            {
                path: "examples/map-with-markers.tsx",
                type: "registry:example",
            },
        ],
    },
    {
        name: "map-with-custom-markers",
        type: "registry:example",
        registryDependencies: ["map"],
        files: [
            {
                path: "examples/map-with-custom-markers.tsx",
                type: "registry:example",
            },
        ],
    },
    {
        name: "map-with-zoom-control",
        type: "registry:example",
        registryDependencies: ["map"],
        files: [
            {
                path: "examples/map-with-zoom-control.tsx",
                type: "registry:example",
            },
        ],
    },
]
