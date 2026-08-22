import type { Metadata } from "next"
import ProductsClient from "./ProductsClient"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore EverCeutical's range of advanced exosome products — Whartexa, Hyalique-X, BlueVive, and more. Clinically validated exosome therapies for skin, hair, and cellular rejuvenation.",
  keywords: "exosome products, Whartexa, Hyalique-X, BlueVive, exosome therapy products, aesthetic biotechnology",
  openGraph: {
    title: "Products | EverCeutical",
    description: "Advanced exosome products for skin, hair, and cellular rejuvenation.",
    url: "https://everceutical.vercel.app/products",
  },
  alternates: { canonical: "https://everceutical.vercel.app/products" },
}

export default function Page() {
  return <ProductsClient />
}
