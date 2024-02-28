import PlausibleProvider from "next-plausible"
import { getSEOTags } from "@/libs/seo"
import ClientLayout from "@/components/LayoutClient"
import config from "@/config"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Nunito } from "next/font/google"

const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
}

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags()

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme={config.colors.theme}
      className={nunito.className}
    >
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
