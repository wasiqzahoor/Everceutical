import type { Metadata } from "next"
import CookieClient from "./CookieClient"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "EverCeutical's Cookie Policy — how we use cookies and tracking technologies to improve your browsing experience on our website.",
  keywords: "cookie policy, cookies, tracking technologies, website cookies",
  openGraph: {
    title: "Cookie Policy | EverCeutical",
    description: "How EverCeutical uses cookies and tracking technologies.",
    url: "https://everceutical.vercel.app/cookie-policy",
  },
  alternates: { canonical: "https://everceutical.vercel.app/cookie-policy" },
}

export default function Page() {
  return <CookieClient />
}
