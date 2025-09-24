import Clarity from "@microsoft/clarity"
import { z } from "zod"

const eventSchema = z.object({
    action: z.enum(["copy_npm_command"]),
})

export type Event = z.infer<typeof eventSchema>

export function trackEvent(input: Event): void {
    const event = eventSchema.parse(input)
    if (event) {
        Clarity.event(event.action)
    }
}
