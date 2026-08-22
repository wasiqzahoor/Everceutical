import type { Metadata } from "next"
import TermsClient from "./TermsClient"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "EverCeutical's Terms & Conditions — rules and guidelines governing the use of our website, products, and services.",
  keywords: "terms and conditions, terms of service, legal terms, EverCeutical terms",
  openGraph: {
    title: "Terms & Conditions | EverCeutical",
    description: "Rules and guidelines for using EverCeutical's website and services.",
    url: "https://everceutical.vercel.app/terms-conditions",
  },
  alternates: { canonical: "https://everceutical.vercel.app/terms-conditions" },
}

export default function Page() {
  return <TermsClient />
}
