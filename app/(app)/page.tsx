import { MapDemo } from "@/components/map-demo"
import { siteConfig } from "@/lib/config"
import { Button } from "@/registry/new-york-v4/ui/button"
import type { Metadata } from "next"
import Link from "next/link"

const title = siteConfig.title
const description = siteConfig.description

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
}

export default function IndexPage() {
    return (
        <div className="flex flex-1 flex-col">
            <section className="container-wrapper flex flex-1 flex-col">
                <div className="container flex flex-1 flex-col items-center gap-2 text-center xl:gap-4">
                    <h1 className="text-primary leading-tighter max-w-4xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
                        {title}
                    </h1>
                    <p className="text-foreground max-w-3xl text-base text-balance sm:text-lg">
                        {description}
                    </p>
                    <div className="flex w-full items-center justify-center gap-2 **:data-[slot=button]:shadow-none">
                        <Button asChild size="sm">
                            <Link href="/docs">Get Started</Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                            <Link href="/docs/examples">View Examples</Link>
                        </Button>
                    </div>
                    <MapDemo />
                </div>
            </section>
        </div>
    )
}
