import type { Metadata } from "next"
import BlogsClient from "./BlogsClient"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest insights on exosome therapy, regenerative medicine, HUC-MSC research, and aesthetic biotechnology from EverCeutical's expert team.",
  keywords: "exosome blog, regenerative medicine articles, HUC-MSC research, exosome therapy news, biotechnology blog",
  openGraph: {
    title: "Blog | EverCeutical",
    description: "Latest insights on exosome therapy and regenerative medicine.",
    url: "https://everceutical.vercel.app/blogs",
  },
  alternates: { canonical: "https://everceutical.vercel.app/blogs" },
}

export default function Page() {
  return <BlogsClient />
}
