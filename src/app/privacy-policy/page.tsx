import type { Metadata } from "next"
import PrivacyClient from "./PrivacyClient"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "EverCeutical's Privacy Policy — how we collect, use, and protect your personal information when you visit our website or use our services.",
  keywords: "privacy policy, data protection, personal information, EverCeutical privacy",
  openGraph: {
    title: "Privacy Policy | EverCeutical",
    description: "How EverCeutical collects, uses, and protects your personal information.",
    url: "https://everceutical.vercel.app/privacy-policy",
  },
  alternates: { canonical: "https://everceutical.vercel.app/privacy-policy" },
}

export default function Page() {
  return <PrivacyClient />
}
