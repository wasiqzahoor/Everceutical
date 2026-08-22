import type { Metadata } from "next"
import HomeClient from "./HomeClient"

export const metadata: Metadata = {
  title: "EverCeutical | Advanced Exosome Biotechnology & Regenerative Aesthetics",
  description:
    "Pioneering advanced exosome biotechnology for regenerative medicine, aesthetic dermatology, and cellular optimization. Clinically validated exosome therapies backed by Vesco Science Co., Ltd. (South Korea).",
  keywords: "exosomes, exosome therapy, regenerative medicine, HUC-MSC, skin rejuvenation, hair restoration, biotechnology, Vesco Science",
  openGraph: {
    title: "EverCeutical | Advanced Exosome Biotechnology",
    description: "Pioneering advanced exosome biotechnology for regenerative medicine and aesthetic dermatology.",
    url: "https://everceutical.vercel.app",
  },
  alternates: { canonical: "https://everceutical.vercel.app" },
}

export default function Page() {
  return <HomeClient />
}
