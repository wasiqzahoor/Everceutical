import { products } from "@/data/siteData"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductPageClient from "./ProductPageClient"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)
  if (!product) return {}
  return {
    title: product.title,
    description: `${product.title} — ${product.subtitle || "Advanced exosome product by EverCeutical"}. Clinically validated exosome therapy for regenerative aesthetics.`,
    keywords: `${product.title}, exosome therapy, ${product.category || "aesthetic biotechnology"}, EverCeutical`,
    openGraph: {
      title: `${product.title} | EverCeutical`,
      description: product.subtitle || "Advanced exosome product by EverCeutical",
      url: `https://everceutical.vercel.app/products/${slug}`,
    },
    alternates: { canonical: `https://everceutical.vercel.app/products/${slug}` },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)
  if (!product) notFound()
  return <ProductPageClient slug={slug} />
}
