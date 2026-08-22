"use client"

import Link from "next/link"
import { ProductData } from "@/data/siteData"

interface ProductCardProps {
  product: ProductData
}

export default function ProductCard({ product }: ProductCardProps) {
  const isComingSoon = product.comingSoon
  const accent = product.accentColor

  return (
    <Link href={product.href} className="group block h-full">
      <div
        className="relative rounded-2xl overflow-hidden h-full flex flex-col bg-white transition-all duration-500"
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
        }}
      >
        {/* IMAGE SECTION - Fixed aspect ratio */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.fullName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              draggable={false}
              loading="lazy"
            />
          ) : product.img ? (
            <img
              src={product.img}
              alt={product.fullName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              draggable={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={`${accent}30`} strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className="inline-block px-2 py-0.5 rounded-md text-[8px] font-bold tracking-wider uppercase backdrop-blur-sm"
              style={{ backgroundColor: `${accent}18`, color: accent }}
            >
              {product.category}
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase backdrop-blur-sm bg-[#f1f5f9]/90 text-[#64748b]">
              {product.size}
            </span>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="px-4 py-3 flex flex-col flex-1">
          <h3 className="text-[13px] font-bold text-[#0f172a] mb-1 line-clamp-1 group-hover:text-[#38bdf8] transition-colors">
            {product.fullName}
          </h3>
          <p className="text-[11px] text-[#64748b] leading-relaxed mb-2 line-clamp-2">
            {product.desc}
          </p>

          {/* Benefits */}
          <div className="space-y-1 mb-3 min-h-[32px]">
            {product.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <svg
                  className="w-3 h-3 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={accent}
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[10px] text-[#64748b] line-clamp-1 leading-snug">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <div
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-white text-[11px] font-semibold transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
              }}
            >
              {isComingSoon ? "Get Notified" : "View Details"}
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
