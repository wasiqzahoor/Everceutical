import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with EverCeutical for exosome therapy inquiries, clinical partnerships, product information, and wholesale opportunities. Based in Seoul, South Korea.",
  keywords: "contact EverCeutical, exosome therapy inquiry, clinical partnership, product information, Seoul Korea",
  openGraph: {
    title: "Contact Us | EverCeutical",
    description: "Get in touch with EverCeutical for exosome therapy inquiries and partnerships.",
    url: "https://everceutical.vercel.app/contact",
  },
  alternates: { canonical: "https://everceutical.vercel.app/contact" },
}

export default function Page() {
  return <ContactClient />
}
