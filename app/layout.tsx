import type { Metadata } from "next"

import { ActiveThemeProvider } from "@/components/active-theme"
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutProvider } from "@/hooks/use-layout"
import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import { ClarityScript } from "@/components/clarity-script"
import "@/styles/globals.css"

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    description: siteConfig.description,
    keywords: [
        "map",
        "leaflet",
        "react leaflet",
        "shadcn/ui",
        "shadcn/ui map",
        "shadcn map",
    ],
    authors: [
        {
            name: "Hin",
            url: "https://tonghohin.vercel.app",
        },
    ],
    creator: "Hin",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
                    }}
                />
                <meta name="theme-color" content={META_THEME_COLORS.light} />
            </head>
            <body
                className={cn(
                    "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
                    fontVariables
                )}>
                <ThemeProvider>
                    <LayoutProvider>
                        <ActiveThemeProvider>
                            {children}
                            <ClarityScript />
                        </ActiveThemeProvider>
                    </LayoutProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
