import Clarity from "@microsoft/clarity"
import { z } from "zod"

const eventSchema = z.object({
    action: z.enum([
        "copy_npm_command",
        "copy_usage_import_code",
        "copy_usage_code",
        "copy_primitive_code",
        "copy_theme_code",
        "copy_chunk_code",
    ]),
    identifier: z.string(),
})

export type Event = z.infer<typeof eventSchema>

export function trackEvent(input: Event): void {
    const event = eventSchema.parse(input)
    if (event) {
        Clarity.event(`${event.action}-${event.identifier}`)
    }
}
