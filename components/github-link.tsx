import Link from "next/link"

import { Icons } from "@/components/icons"
import { siteConfig } from "@/lib/config"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"
import React from "react"

export function GitHubLink() {
    return (
        <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
            <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer">
                <Icons.gitHub />
                <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
                    <StarsCount />
                </React.Suspense>
            </Link>
        </Button>
    )
}

export async function StarsCount() {
    const data = await fetch(
        "https://api.github.com/repos/tonghohin/shadcn-map",
        { cache: "no-store" }
    )
    const json = await data.json()
    if (!json.stargazers_count) return null

    return (
        <span className="text-muted-foreground text-xs tabular-nums">
            {json.stargazers_count >= 1000
                ? `${(json.stargazers_count / 1000).toFixed(1)}k`
                : json.stargazers_count.toLocaleString()}
        </span>
    )
}
