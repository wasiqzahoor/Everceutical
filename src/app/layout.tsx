import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import LenisProvider from "@/components/LenisProvider"
import BackgroundVideo from "@/components/BackgroundVideo"
import { LoadingProvider } from "@/components/LoadingContext"
import LoadingScreen from "@/components/LoadingScreen"
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const siteUrl = "https://everceutical.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EverCeutical | Advanced Exosome Biotechnology & Regenerative Aesthetics",
    template: "%s | EverCeutical",
  },
  description:
    "EverCeutical pioneers advanced exosome biotechnology for regenerative medicine, aesthetic dermatology, and cellular optimization. Backed by Vesco Science Co., Ltd. (South Korea), we deliver clinically validated, non-invasive exosome therapies for skin rejuvenation, hair restoration, and cellular repair.",
  keywords: [
    "exosomes", "exosome therapy", "regenerative medicine", "aesthetic dermatology",
    "HUC-MSC exosomes", "skin rejuvenation", "hair restoration", "collagen stimulation",
    "cellular repair", "biotechnology", "Vesco Science", "lyophilized exosomes",
    "anti-aging", "non-invasive aesthetics", "Korean biotechnology",
    "exosome skincare", "stem cell exosomes", "fibroblast exosomes", "plant exosomes",
  ],
  authors: [{ name: "Chaudhary Wasiq Zahoor", url: "https://newtechsofts.com/" }],
  creator: "Chaudhary Wasiq Zahoor",
  publisher: "New Tech Softs",
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "EverCeutical",
    title: "EverCeutical | Advanced Exosome Biotechnology & Regenerative Aesthetics",
    description:
      "Pioneering advanced exosome biotechnology for regenerative medicine and aesthetic dermatology. Clinically validated exosome therapies backed by Vesco Science Co., Ltd.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "EverCeutical - Exosome Biotechnology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EverCeutical | Advanced Exosome Biotechnology",
    description:
      "Pioneering advanced exosome biotechnology for regenerative medicine and aesthetic dermatology.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {},
  icons: {
    icon: [
      { url: "images/logo.png", type: "image/png" },
    ],
    shortcut: "images/logo.png",
    apple: [
      { url: "images/logo.png", type: "image/png" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EverCeutical",
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              description: "Advanced exosome biotechnology engineered for regenerative medicine, aesthetic dermatology, and cellular optimization.",
              founder: {
                "@type": "Person",
                name: "Chaudhary Wasiq Zahoor",
              },
              sameAs: [
                "https://www.facebook.com/EverCeutical",
                "https://www.instagram.com/everceutical/",
                "https://www.tiktok.com/@everceutical",
                "https://www.youtube.com/@EverCeutical",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "everceutical@gmail.com",
                contactType: "customer service",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Seoul",
                addressCountry: "KR",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} style={{ background: "#0a1628" }}>
        <ServiceWorkerRegistration />
        <LoadingProvider>
          <LoadingScreen />
          <LenisProvider>
            <BackgroundVideo />
            <div className="relative" style={{ zIndex: 10 }}>
              {children}
            </div>
          </LenisProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}



