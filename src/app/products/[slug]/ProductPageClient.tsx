"use client"

import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BeforeAfterSection from "@/components/BeforeAfterSection"
import { products, benefitDetails } from "@/data/siteData"
import dynamic from "next/dynamic"

const WhartexaSections = dynamic(() => import("@/components/product-sections/WhartexaSections"), { ssr: false })
const HyaliqueXSections = dynamic(() => import("@/components/product-sections/HyaliqueXSections"), { ssr: false })
const BlueViveSections = dynamic(() => import("@/components/product-sections/BlueViveSections"), { ssr: false })

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold, rootMargin: "0px 0px -30px 0px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}


/* ─── Image Slider (Premium) ─── */
function ImageSlider({ images, accent }: { images: string[]; accent: string }) {
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = useCallback((newIdx: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIdx(newIdx)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const next = useCallback(() => goTo((idx + 1) % images.length), [idx, images.length, goTo])
  const prev = useCallback(() => goTo((idx - 1 + images.length) % images.length), [idx, images.length, goTo])

  useEffect(() => {
    if (auto && images.length > 1) timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [auto, next, images.length])

  if (images.length === 0) return null

  const containerStyle = { aspectRatio: "1 / 1" }

  return (
    <div className="relative w-full" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      <div
        className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] shadow-lg"
        style={containerStyle}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "scale(1)" : "scale(1.08)",
            }}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-[11px] font-medium">
          {idx + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-1.5 mt-2 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] shrink-0"
              style={{
                opacity: i === idx ? 1 : 0.35,
                outline: i === idx ? `2px solid ${accent}` : "none",
                outlineOffset: "2px",
                transform: i === idx ? "scale(1)" : "scale(0.95)",
              }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Coming Soon Card ─── */
function ComingSoonCard({ product, accent }: { product: any; accent: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100/50" style={{ background: "linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)" }}>
      <div className="p-8 text-center">
        <div className="relative w-20 h-20 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: `${accent}20`, animation: "spin 20s linear infinite", opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease" }} />
          <div className="absolute inset-2 rounded-full border" style={{ borderColor: `${accent}12`, animation: "spin 14s linear infinite reverse", opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 0.15s" }} />
          <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scale(1)" : "scale(0.5)", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.25s" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}10` }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1" style={{ color: accent, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(8px)", transition: "all 0.4s ease 0.35s" }}>
          Coming Soon
        </h3>
        <p className="text-[13px] text-[#64748b] mb-5" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease 0.45s" }}>
          {product.fullName}
        </p>
        <div className="flex items-center justify-center gap-2" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(8px)", transition: "all 0.4s ease 0.55s" }}>
          <Link href="/contact" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-[12px] font-semibold" style={{ backgroundColor: accent }}>
            Get Notified
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Animated Section ─── */
function AnimatedSection({ id, children, accent }: { id: string; children: React.ReactNode; accent: string }) {
  const { ref, visible } = useInView(0.08)
  return (
    <div
      id={id}
      ref={ref}
      className="scroll-mt-20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  )
}

/* ─── Section Header ─── */
function SectionHeader({ badge, title, highlight, accent }: { badge: string; title: string; highlight: string; accent: string }) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ backgroundColor: `${accent}08` }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>{badge}</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
        {title} <span style={{ color: accent }}>{highlight}</span>
      </h2>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PRODUCT PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ProductPageClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.id === slug)

  if (!product) {
    return (
      <main className="relative min-h-screen" style={{ zIndex: 10 }}>
        <Navbar />
        <div className="text-center px-6 py-32">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-4">Product Not Found</h1>
          <Link href="/products" className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#0ea5e9] text-white text-sm font-semibold">Back to Products</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const accent = product.accentColor
  const hasImages = product.images && product.images.length > 0
  const isComingSoon = product.comingSoon

  return (
    <main className="relative min-h-screen" style={{ zIndex: 10 }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="product-hero relative pt-24 pb-8 md:pt-32 md:pb-10 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] text-white/60 mb-6">
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white/80">{product.category}</span>
            <span>/</span>
            <span className="text-white/90">{product.fullName}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left - Image */}
            <div className="lg:w-[380px] shrink-0">
              {hasImages ? (
                <ImageSlider images={(product.images || []).slice(0, 5)} accent={accent} />
              ) : (
                <ComingSoonCard product={product} accent={accent} />
              )}
            </div>

            {/* Right - Info */}
            <div className="flex-1 min-w-0">
              {/* Category badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${accent}08` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>{product.category}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                {product.subtitle}
              </h1>
              <p className="text-[14px] font-semibold mb-3 text-white/80">{product.fullName} &middot; {product.size}</p>
              <p className="text-white/90 text-[13px] max-w-lg leading-relaxed mb-4">{product.desc}</p>

              {/* Product details under name */}
              {product.pageType && (
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5">
                  {product.category && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
                      <span className="text-[11px] text-white/80">{product.category}</span>
                    </div>
                  )}
                  {product.peptides?.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>
                      <span className="text-[11px] text-white/80">{(product.id === "whartexa-20b" || product.id === "whartexa-60b") ? "American Origin" : `${product.peptides.length} Active ${product.peptides.length === 1 ? "Peptide" : "Peptides"}`}</span>
                    </div>
                  )}
                  {product.benefits?.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[11px] text-white/80">{product.benefits.length} Key Benefits</span>
                    </div>
                  )}
                  {product.idealFor?.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                      <span className="text-[11px] text-white/80">For {product.idealFor.length} Target Areas</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quick stats */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  {isComingSoon ? (
                    <>
                      <span className="w-2 h-2 rounded-full animate-pulse bg-white" />
                      <span className="text-[11px] font-semibold text-white">Coming Soon</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-semibold text-white">Available Now</span>
                    </>
                  )}
                </div>
                {product.peptides.length > 0 && (
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
                    </svg>
                    <span className="text-[11px] font-semibold text-white">{(product.id === "whartexa-20b" || product.id === "whartexa-60b") ? "American" : product.id === "blue-vive" ? "Vials" : `${product.peptides.length} ${product.peptides.length === 1 ? "Peptide" : "Peptides"}`}</span>
                  </div>
                )}
                {product.caseStudies && product.caseStudies.length > 0 && (
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="text-[11px] font-semibold text-white">{product.caseStudies.length} Case Studies</span>
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                {isComingSoon ? (
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[13px] font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ backgroundColor: accent, boxShadow: `0 4px 16px ${accent}30` }}>
                    Get Notified
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                ) : (
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[13px] font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ backgroundColor: accent, boxShadow: `0 4px 16px ${accent}30` }}>
                    Contact Us to Order
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                )}
                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white/80 text-[13px] font-semibold border border-white/20 hover:border-white/40 hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY NAV (removed) ═══ */}

      {/* ═══ CONTENT ═══ */}
      <Suspense fallback={null}>
      {product.pageType === "whartexa" ? (
        <WhartexaSections product={product} />
      ) : product.pageType === "hyalique-x" ? (
        <HyaliqueXSections product={product} />
      ) : product.pageType === "bluevive" ? (
        <BlueViveSections product={product} />
      ) : (
      <section className="product-content px-5 sm:px-6 py-6 md:py-10">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* ── Kit Contents ── */}
          {!isComingSoon && (
            <AnimatedSection id="kit" accent={accent}>
              <SectionHeader badge="What's Inside" title="Kit" highlight="Contents" accent={accent} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.kitContent.map((item, i) => (
                  <div key={i} className="group relative rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-2px]" style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${accent}10` }}>
                        <span className="text-[11px] font-bold" style={{ color: accent }}>{i + 1}</span>
                      </div>
                      <p className="text-[13px] text-[#334155] leading-relaxed pt-1">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* ── Peptides ── */}
          {!isComingSoon && (
            <AnimatedSection id="peptides" accent={accent}>
              <SectionHeader badge="Formulation" title="Powered by" highlight="Peptides" accent={accent} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.peptides.map((peptide, i) => (
                  <div key={i} className="group rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-2px]" style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${accent}10` }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#0f172a] mb-0.5">{peptide.name}</h4>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed">{peptide.function}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* ── Benefits ── */}
          {!isComingSoon && (
            <AnimatedSection id="benefits" accent={accent}>
              <SectionHeader badge="Outcomes" title="Key" highlight="Benefits" accent={accent} />

              {/* Regenerative Benefits */}
              <div className="mb-6">
                <div className="text-center mb-5">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#94a3b8]">Cellular Repair & Recovery</span>
                  <h3 className="text-lg font-bold text-[#0f172a]">Regenerative Benefits</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefitDetails.filter(b => b.category === "regenerative").map((benefit, i) => (
                    <div key={i} className="group flex items-start gap-3.5 rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-2px]" style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 ring-2 ring-[#0ea5e9]/20 group-hover:ring-[#0ea5e9]/40 transition-all duration-300">
                        <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#0f172a] mb-0.5">{benefit.title}</h4>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed">{benefit.shortDesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aesthetic Benefits */}
              <div>
                <div className="text-center mb-5">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#94a3b8]">Appearance & Vitality</span>
                  <h3 className="text-lg font-bold text-[#0f172a]">Aesthetic Benefits</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefitDetails.filter(b => b.category === "aesthetic").map((benefit, i) => (
                    <div key={i} className="group flex items-start gap-3.5 rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-2px]" style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 ring-2 ring-[#0ea5e9]/20 group-hover:ring-[#0ea5e9]/40 transition-all duration-300">
                        <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#0f172a] mb-0.5">{benefit.title}</h4>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed">{benefit.shortDesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* ── Ideal For ── */}
          {!isComingSoon && (
            <AnimatedSection id="ideal" accent={accent}>
              <SectionHeader badge="Candidates" title="Ideal" highlight="For" accent={accent} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(product.idealFor || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:translate-x-1" style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}10` }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-[13px] text-[#334155] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* ── How to Use ── */}
          {!isComingSoon && (
            <AnimatedSection id="howto" accent={accent}>
              <SectionHeader badge="Guide" title="How to" highlight="Use" accent={accent} />
              <div className="relative pl-8">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] rounded-full" style={{ background: `linear-gradient(180deg, ${accent}30, ${accent}08)` }} />
                <div className="space-y-4">
                  {(product.howToUse || []).map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-8 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10" style={{ borderColor: accent }}>
                        <span className="text-[9px] font-bold" style={{ color: accent }}>{i + 1}</span>
                      </div>
                      <div className="rounded-2xl p-4 transition-all duration-300 hover:translate-x-1" style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                        <p className="text-[13px] text-[#334155] leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* ── Results / Before & After ── */}
          {!isComingSoon && product.caseStudies && product.caseStudies.length > 0 && (
            <AnimatedSection id="results" accent={accent}>
              <SectionHeader badge="Results" title="Before &" highlight="After" accent={accent} />
              <BeforeAfterSection caseStudies={product.caseStudies} accent={accent} />
            </AnimatedSection>
          )}

          {/* ── Important Note ── */}
          {!isComingSoon && (
            <div className="rounded-2xl p-5 flex items-start gap-4" style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#fef3c7" }}>
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#0f172a] mb-1">Important Note</h3>
                <p className="text-[12px] text-[#334155] leading-relaxed">{product.importantNote}</p>
              </div>
            </div>
          )}

          {/* ── Product Brochure (Exogenesis only) ── */}
          {(product.id === "exogenesis-scalp-10b" || product.id === "exogenesis-scalp-15b" || product.id === "exogenesis-vital-kit-10b" || product.id === "exogenesis-vital-kit-15b") && (
            <AnimatedSection id="brochure" accent={accent}>
              <div className="max-w-sm mx-auto">
                <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-1">Product Brochure</h3>
                  <p className="text-[12px] text-[#94a3b8] mb-4">Download the official brochure for detailed information.</p>
                  <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-gray-200 mb-4">
                    <img
                      src={product.id.includes("scalp") ? "/images/brochures/ExoGenesis-Scalp-Brochure.PNG" : "/images/brochures/ExoGenesis-vital.PNG"}
                      alt="Exogenesis Brochure Preview"
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">Click to Download</span>
                    </div>
                  </div>
                  <a
                    href={product.id.includes("scalp") ? "/images/brochures/ExoGenesis-scalp.pdf" : "/images/brochures/ExoGenesis-vital.pdf"}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0ea5e9] text-white text-[12px] font-semibold hover:bg-[#0284c7] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Brochure (PDF)
                  </a>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* ── CTA ── */}
          <div className="rounded-2xl p-8 text-center" style={{ background: `linear-gradient(135deg, ${accent}08, ${accent}03)`, border: `1px solid ${accent}10` }}>
            <h3 className="text-xl font-bold text-[#0f172a] mb-2">
              {isComingSoon ? "Interested in this product?" : "Ready to get started?"}
            </h3>
            <p className="text-[#64748b] text-[13px] mb-5 max-w-md mx-auto">
              {isComingSoon ? "We'll notify you as soon as it becomes available." : "Reach out to us for pricing, orders, or any questions."}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[13px] font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ backgroundColor: accent, boxShadow: `0 4px 16px ${accent}30` }}>
                {isComingSoon ? "Get Notified" : "Contact Us"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[#334155] text-[13px] font-semibold border border-gray-200 hover:border-gray-300 transition-all duration-300">
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}
      </Suspense>

      <Footer />
    </main>
  )
}
