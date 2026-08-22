import type { Metadata } from "next"
import InspectionClient from "./InspectionClient"

export const metadata: Metadata = {
  title: "Inspection Report",
  description:
    "View EverCeutical's quality inspection reports — multi-stage laboratory testing, clinical efficacy evaluations, and safety assessments for all exosome products.",
  keywords: "inspection report, quality testing, exosome safety, clinical evaluation, laboratory testing",
  openGraph: {
    title: "Inspection Report | EverCeutical",
    description: "Quality inspection and testing reports for EverCeutical exosome products.",
    url: "https://everceutical.vercel.app/inspection-report",
  },
  alternates: { canonical: "https://everceutical.vercel.app/inspection-report" },
}

export default function Page() {
  return <InspectionClient />
}
