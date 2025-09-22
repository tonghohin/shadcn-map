import { type Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
    {
        name: "map-demo",
        type: "registry:example",
        registryDependencies: ["map"],
        files: [
            {
                path: "examples/map-demo.tsx",
                type: "registry:example"
            }
        ]
    }
];
