"use client"

import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { products, productCategories, type ProductData } from "@/data/siteData"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOOKS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold, rootMargin: "0px 0px -40px 0px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = 0
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, end, duration])
  return count
}

function useMouseParallax(intensity = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity * 100
      const y = (e.clientY / window.innerHeight - 0.5) * intensity * 100
      setOffset({ x, y })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [intensity])
  return offset
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 1 — PREMIUM HERO
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function HeroSection() {
  const { ref, visible } = useInView(0.1)
  const mouse = useMouseParallax(0.015)

  return (
    <section ref={ref} className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-5 sm:px-6 overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-32 right-[15%] w-72 h-72 rounded-full bg-[#0ea5e9]/[0.04] blur-[100px] pointer-events-none" style={{ transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)` }} />
      <div className="absolute bottom-10 left-[10%] w-56 h-56 rounded-full bg-[#0ea5e9]/[0.03] blur-[80px] pointer-events-none" style={{ transform: `translate(${mouse.x * -0.3}px, ${mouse.y * -0.3}px)` }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#0ea5e9]/[0.08] pointer-events-none"
          style={{
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `floatUp ${10 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card mb-8">
            <div className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
            <span className="text-[10px] text-[#0ea5e9] font-bold tracking-[0.3em] uppercase">Advanced Exosome Science</span>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0f172a] leading-[1.08] mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s",
          }}
        >
          Beautiful{" "}
          <span className="relative inline-block">
            <span className="text-[#0ea5e9]">Exosome Solutions</span>
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <path d="M2 9 C80 2, 220 2, 298 9" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
            </svg>
          </span>
          <br />
          <span className="text-[#0f172a]/70">for Modern Clinics</span>
        </h1>

        {/* Description */}
        <p
          className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.3s",
          }}
        >
          Explore our complete range of clinically engineered exosome formulations designed for targeted regenerative and aesthetic applications.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.4s",
          }}
        >
          <Link
            href="/research-technology"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#0ea5e9] text-white text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#0ea5e9]/25 hover:scale-105"
          >
            Explore Technology
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="#products"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl glass-card text-[#334155] text-sm font-semibold transition-all duration-300 hover:border-[#0ea5e9]/20"
          >
            Browse Products
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <HeroStats visible={visible} />
      </div>
    </section>
  )
}

function HeroStats({ visible }: { visible: boolean }) {
  const stats = [
    { displayValue: "10B-60B+", label: "Exosome Particles", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { displayValue: "99.9%", label: "Purity Standard", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { displayValue: "100+", label: "Bioactive Molecules", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { displayValue: "10-150 nm", label: "Nanoscale Vesicles", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} visible={visible} />
      ))}
    </div>
  )
}

function StatCard({ stat, index, visible }: { stat: { displayValue: string; label: string; icon: string }; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group glass-card rounded-2xl p-4 sm:p-5 text-center cursor-default transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(25px) scale(0.95)",
        transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.5 + index * 0.1}s`,
        boxShadow: hovered ? "0 16px 40px -8px rgba(14,165,233,0.12)" : undefined,
      }}
    >
      <div className="w-9 h-9 rounded-xl bg-[#0ea5e9]/[0.06] flex items-center justify-center mx-auto mb-2.5 transition-all duration-300 group-hover:bg-[#0ea5e9]/[0.12] group-hover:scale-110">
        <svg className="w-4.5 h-4.5 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
        </svg>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-[#0f172a]">
        {stat.displayValue}
      </div>
      <div className="text-[10px] sm:text-[11px] text-[#64748b] font-medium mt-0.5">{stat.label}</div>
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 2 — FILTER CHIPS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const filterData = [
  { name: "All", value: "all", color: "#0ea5e9" },
  { name: "ExoGenesis", value: "EXOGENESIS", color: "#4a8ba8" },
  { name: "Whartexa", value: "WHARTEXA", color: "#5b7c91" },
  { name: "Hyalique-X", value: "HYALIQUE-X", color: "#c9a84a" },
  { name: "Hair Care", value: "hair", color: "#0ea5e9" },
  { name: "Skin Care", value: "skin", color: "#8b5cf6" },
  { name: "Available", value: "available", color: "#10b981" },
]

function FilterChips({ onSelect, active }: { onSelect: (v: string) => void; active: string }) {
  const { ref, visible } = useInView(0.1)

  return (
    <section ref={ref} className="px-5 sm:px-6 pt-6 pb-2">
      <div className="max-w-6xl mx-auto">
        <div
          className="flex flex-wrap justify-center gap-2.5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {filterData.map((f, i) => (
            <button
              key={f.value}
              onClick={() => onSelect(f.value)}
              className="relative px-5 py-2.5 rounded-full text-[12px] font-semibold transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transition: `all 0.4s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.04}s`,
                backgroundColor: active === f.value ? f.color : "rgba(255,255,255,0.7)",
                color: active === f.value ? "#fff" : "#475569",
                backdropFilter: "blur(12px)",
                border: `1.5px solid ${active === f.value ? f.color : "rgba(200,200,200,0.15)"}`,
                boxShadow: active === f.value
                  ? `0 4px 16px -2px ${f.color}35, 0 0 0 1px ${f.color}10`
                  : "0 2px 8px rgba(0,0,0,0.04)",
                transform: active === f.value ? "scale(1.02)" : "scale(1)",
              }}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 3 — PRODUCT SHOWCASE (Premium Vertical Cards)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function ProductShowcase({ products: filteredProducts }: { products: ProductData[] }) {
  const { ref, visible } = useInView(0.05)

  return (
    <section id="products" ref={ref} className="px-5 sm:px-6 py-10 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <svg className="w-3.5 h-3.5 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-[10px] text-[#0ea5e9] font-bold tracking-[0.25em] uppercase">Our Products</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-2">
            Product <span className="text-[#0ea5e9]">Showcase</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            {filteredProducts.length} clinically engineered formulations.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                visible={visible}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-card rounded-3xl">
            <p className="text-sm text-[#94a3b8]">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

/*  Premium Vertical Product Card (Full-Bleed Image)  */
function ProductCard({ product, index, visible }: { product: ProductData; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)
  const accent = product.accentColor
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardVisible, setCardVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCardVisible(true) }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const staggerDelay = `${0.06 + index * 0.05}s`

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-full"
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${staggerDelay}`,
      }}
    >
      <Link href={product.href} className="block h-full [&>*]:h-full">
        <div
          className="relative rounded-2xl overflow-hidden group flex flex-col h-full bg-white"
          style={{
            boxShadow: hovered
              ? `0 25px 60px -12px ${accent}25, 0 0 0 1px ${accent}12`
              : "0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
            transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
            transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* IMAGE SECTION - 1:1 aspect ratio for 1080x1080 images */}
          <div className="relative w-full aspect-square overflow-hidden bg-[#0a0a0a]">
            {(product.images && product.images.length > 0) ? (
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
              {product.benefits.slice(0, 2).map((b, i) => (
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
                  <span className="text-[10px] text-[#64748b] line-clamp-1 leading-snug">{b}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <div
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-white text-[11px] font-semibold transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  boxShadow: hovered ? `0 10px 30px -4px ${accent}40` : `0 2px 8px -2px ${accent}20`,
                }}
              >
                View Details
                <svg className="w-3 h-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  style={{ transform: hovered ? "translateX(3px)" : "translateX(0)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Shimmer on hover */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl z-20"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: hovered ? "shimmer 1.5s ease-in-out" : "none",
              opacity: hovered ? 1 : 0,
            }}
          />
          <style>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      </Link>
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 4 — COMPARISON STRIP
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function ComparisonStrip() {
  const { ref, visible } = useInView(0.1)
  const items = [
    { label: "Recovery Time", value: "Minimal", image: "/images/icons/products/recovery-time.jpg" },
    { label: "Strength", value: "High Potency", image: "/images/icons/products/strength.png" },
    { label: "Application", value: "Professional", image: "/images/icons/products/application.jpg" },
    { label: "Duration", value: "6-12 Months", image: "/images/icons/products/duration.png" },
    { label: "Best For", value: "All Skin Types", image: "/images/icons/products/best-for.png" },
  ]

  return (
    <section ref={ref} className="px-5 sm:px-6 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div
          className="text-center mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-[#0f172a] mb-1">
            Why Choose <span className="text-[#0ea5e9]">Our Products</span>?
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-4 text-center group hover:translate-y-[-4px] transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden mx-auto mb-2.5 group-hover:scale-110 transition-all duration-300">
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider font-medium mb-0.5">{item.label}</p>
              <p className="text-[13px] font-bold text-[#0f172a]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 5 — CLINICAL BENEFITS (BENTO)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function ClinicalBenefits() {
  const { ref, visible } = useInView(0.1)
  const benefits = [
    { title: "Fast Recovery", desc: "Minimized downtime with advanced formulations", image: "/images/icons/clinical/fast-recovery.jpg", span: "sm:col-span-1" },
    { title: "Minimal Downtime", desc: "Return to daily activities within hours", image: "/images/icons/clinical/minimal-downtime.jpg", span: "sm:col-span-1" },
    { title: "Clinically Tested", desc: "Peer-reviewed research and validated outcomes", image: "/images/icons/clinical/clinically-tested.png", span: "sm:col-span-2 lg:col-span-1" },
    { title: "Long Lasting", desc: "Sustained regenerative effects over months", image: "/images/icons/clinical/long-lasting.jpg", span: "sm:col-span-1" },
    { title: "Premium Ingredients", desc: "Medical-grade purity with 99.9% standard", image: "/images/icons/clinical/premium-ingredients.png", span: "sm:col-span-1" },
    { title: "Scientifically Proven", desc: "Backed by extensive clinical research data", image: "/images/icons/clinical/scientifically-proven.jpg", span: "sm:col-span-2 lg:col-span-1" },
  ]

  return (
    <section ref={ref} className="px-5 sm:px-6 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <svg className="w-3.5 h-3.5 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] text-[#0ea5e9] font-bold tracking-[0.25em] uppercase">Benefits</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-2">
            Clinical <span className="text-[#0ea5e9]">Advantages</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Why leading clinics trust our exosome technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-5 group hover:translate-y-[-4px] transition-all duration-300 ${b.span}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(25px)",
                transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.08}s`,
              }}
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[15px] font-bold text-[#0f172a] mb-1">{b.title}</h3>
              <p className="text-[12px] text-[#64748b] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 6 — TECHNOLOGY TIMELINE
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function TechTimeline() {
  const { ref, visible } = useInView(0.1)
  const steps = [
    { title: "Research", desc: "Peer-reviewed studies & data analysis", image: "/images/icons/clinical/research.png" },
    { title: "Extraction", desc: "hUC-MSCs sourcing from ethical donors", image: "/images/icons/clinical/extraction.png" },
    { title: "Purification", desc: "Advanced isolation & quality control", image: "/images/icons/clinical/purification.jpg" },
    { title: "Laboratory Testing", desc: "99.9% purity verification & potency assays", image: "/images/icons/clinical/laboratory-testing.png" },
    { title: "Clinical Application", desc: "Professional administration protocols", image: "/images/icons/clinical/clinical-application.png" },
  ]

  return (
    <section ref={ref} className="px-5 sm:px-6 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <svg className="w-3.5 h-3.5 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-[10px] text-[#0ea5e9] font-bold tracking-[0.25em] uppercase">Process</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-2">
            Technology <span className="text-[#0ea5e9]">Pipeline</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            From research to clinical application — our rigorous process.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] hidden sm:block" style={{ background: "linear-gradient(to bottom, #0ea5e920, #0ea5e940, #0ea5e920)" }} />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex items-start gap-4 sm:gap-6 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.1}s`,
                }}
              >
                {/* Number */}
                <div className="relative z-10 shrink-0">
                  <div className="w-[54px] h-[54px] rounded-2xl overflow-hidden border border-[#0ea5e9]/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#0ea5e9]/10">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-4 sm:p-5 flex-1 group-hover:translate-x-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-[#0ea5e9] uppercase tracking-[0.2em]">Step {i + 1}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0f172a] mb-0.5">{step.title}</h3>
                  <p className="text-[12px] text-[#64748b] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 7 — TRUST SECTION
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function TrustSection() {
  const { ref, visible } = useInView(0.1)
  const items = [
    { title: "Laboratory Quality", desc: "ISO-certified manufacturing", image: "/images/icons/products/laboratory-quality.jpg", count: "99.9%" },
    { title: "Clinical Standards", desc: "FDA-compliant protocols", image: "/images/icons/products/clinical-standards.jpg", count: "100+" },
    { title: "Sterile Manufacturing", desc: "Cleanroom production", image: "/images/icons/products/sterile-manufacturing.png", count: "GMP" },
    { title: "Worldwide Shipping", desc: "Cold-chain logistics", image: "/images/icons/products/worldwide-shipping.png", count: "50+" },
  ]

  return (
    <section ref={ref} className="px-5 sm:px-6 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <svg className="w-3.5 h-3.5 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] text-[#0ea5e9] font-bold tracking-[0.25em] uppercase">Trust</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-2">
            Product <span className="text-[#0ea5e9]">Standards</span>
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            The quality and safety standards behind every formulation.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 text-center group hover:translate-y-[-4px] transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(25px)",
                transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.08}s`,
              }}
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-lg font-bold text-[#0ea5e9] mb-1">{item.count}</div>
              <h3 className="text-[13px] font-bold text-[#0f172a] mb-0.5">{item.title}</h3>
              <p className="text-[10px] text-[#94a3b8]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION 8 — PREMIUM CTA
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function PremiumCTA() {
  const { ref, visible } = useInView(0.1)

  return (
    <section ref={ref} className="px-5 sm:px-6 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0ea5e9]/[0.06] blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#38bdf8]/[0.04] blur-[80px] pointer-events-none" />

          {/* Floating particles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/[0.04] pointer-events-none"
              style={{
                width: 3 + i * 2,
                height: 3 + i * 2,
                left: `${20 + i * 20}%`,
                top: `${25 + (i % 2) * 40}%`,
                animation: `floatUp ${8 + i * 2}s ease-in-out infinite`,
              }}
            />
          ))}

          <div className="relative z-10 p-8 sm:p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] mb-6">
              <svg className="w-3.5 h-3.5 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-[10px] text-white/60 font-bold tracking-[0.25em] uppercase">Get Started</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to Transform<br />Your Practice?
            </h2>
            <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-8">
              Contact our scientific team for product consultation, clinical protocols, and partnership opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#0ea5e9] text-white text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#0ea5e9]/30 hover:scale-105"
              >
                Contact Team
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-white/80 text-sm font-semibold transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.15]"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN PAGE
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f4f7]" />}>
      <ProductsPage />
    </Suspense>
  )
}

function ProductsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)

  const filteredProducts = activeCategory === "all"
    ? products
    : activeCategory === "hair"
      ? products.filter(p => p.category === "EXOGENESIS" && p.subtitle.toLowerCase().includes("scalp"))
      : activeCategory === "skin"
        ? products.filter(p => p.subtitle.toLowerCase().includes("vital") || p.subtitle.toLowerCase().includes("rejuvenation"))
        : activeCategory === "available"
          ? products
          : products.filter((p) => p.category === activeCategory)

  return (
    <main className="relative min-h-screen" style={{ zIndex: 10 }}>
      <Navbar />

      {/* Section 1 — Hero */}
      <HeroSection />

      {/* Section 2 — Categories */}
      <FilterChips onSelect={setActiveCategory} active={activeCategory} />

      {/* Section 3 — Product Showcase */}
      <ProductShowcase products={filteredProducts} />

      {/* Section 4 — Comparison Strip */}
      <ComparisonStrip />

      {/* Section 5 — Clinical Benefits */}
      <ClinicalBenefits />

      {/* Section 6 — Technology Timeline */}
      <TechTimeline />

      {/* Section 7 — Trust */}
      <TrustSection />

      {/* Section 8 — CTA */}
      <PremiumCTA />

      <Footer />
    </main>
  )
}







