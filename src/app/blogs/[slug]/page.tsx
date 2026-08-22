import { blogPosts } from "@/data/scrapedData"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BlogContent from "./BlogDetailClient"
import type { Metadata } from "next"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt || `${post.title} — Read the latest insights on exosome therapy and regenerative medicine from EverCeutical.`,
    keywords: `${post.title}, exosome blog, regenerative medicine, EverCeutical`,
    openGraph: {
      title: `${post.title} | EverCeutical Blog`,
      description: post.excerpt || "Latest insights on exosome therapy.",
      url: `https://everceutical.vercel.app/blogs/${slug}`,
    },
    alternates: { canonical: `https://everceutical.vercel.app/blogs/${slug}` },
  }
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <BlogContent params={params} />
      <Footer />
    </main>
  )
}
