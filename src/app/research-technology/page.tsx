import type { Metadata } from "next"
import ResearchClient from "./ResearchClient"

export const metadata: Metadata = {
  title: "Research & Technology",
  description:
    "Discover EverCeutical's exosome research and technology — HUC-MSC derived exosomes, lyophilization, purification processes, and advanced regenerative biotechnology innovations.",
  keywords: "exosome research, HUC-MSC, lyophilization, regenerative biotechnology, exosome technology, scientific innovation",
  openGraph: {
    title: "Research & Technology | EverCeutical",
    description: "Advanced exosome research and regenerative biotechnology innovations.",
    url: "https://everceutical.vercel.app/research-technology",
  },
  alternates: { canonical: "https://everceutical.vercel.app/research-technology" },
}

export default function Page() {
  return <ResearchClient />
}
