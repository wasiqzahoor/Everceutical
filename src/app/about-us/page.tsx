import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EverCeutical — pioneers in advanced exosome biotechnology backed by Vesco Science Co., Ltd. (South Korea). Our mission, vision, manufacturing facility, and commitment to regenerative aesthetics.",
  keywords: "about EverCeutical, Vesco Science, exosome manufacturer, Korean biotechnology, GMP facility, regenerative medicine company",
  openGraph: {
    title: "About Us | EverCeutical",
    description: "Pioneers in advanced exosome biotechnology backed by Vesco Science Co., Ltd.",
    url: "https://everceutical.vercel.app/about-us",
  },
  alternates: { canonical: "https://everceutical.vercel.app/about-us" },
}

export default function Page() {
  return <AboutClient />
}
