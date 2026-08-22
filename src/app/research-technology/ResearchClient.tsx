"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import { researchImages } from "@/data/scrapedData"

function useInView(threshold = 0.15, rootMargin?: string) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const isMobile = window.innerWidth < 768
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: isMobile ? 0.01 : threshold, rootMargin: rootMargin ?? (isMobile ? "200px 0px 0px 0px" : "0px 0px -30px 0px") }
    )
    obs.observe(el)
    const timer = isMobile ? setTimeout(() => setVisible(true), 1500) : setTimeout(() => setVisible(true), 4000)
    return () => { obs.disconnect(); clearTimeout(timer) }
  }, [threshold, rootMargin])

  return { ref, visible }
}

function useMouseParallax(sensitivity = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setOffset({
        x: (e.clientX - window.innerWidth / 2) * sensitivity,
        y: (e.clientY - window.innerHeight / 2) * sensitivity,
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [sensitivity])
  return offset
}

function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute rounded-full bg-[#0ea5e9]/10 pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-10%",
        animation: `floatUp ${12 + delay * 2}s ease-in-out ${delay}s infinite`,
      }}
    />
  )
}

const researchHighlights = [
  { title: "Proprietary Extraction", desc: "Our patented isolation process achieves 99.9% purity while preserving full bioactivity of exosomal cargo — growth factors, microRNA, and cytokines remain intact throughout manufacturing.", image: "/images/icons/process/extraction.jpg", color: "#0ea5e9" },
  { title: "Clinical Validation", desc: "Every formulation undergoes rigorous multi-phase clinical testing including nanoparticle tracking analysis, sterility validation, and efficacy trials before release.", image: "/images/icons/process/clinical-validation.jpg", color: "#0ea5e9" },
  { title: "GMP Manufacturing", desc: "Produced in Vesco Science's 100,000-level dust-free cleanroom facility under strict pharmaceutical-grade protocols and international cosmetic GMP standards.", image: "/images/icons/process/gmp-manufacturing.jpg", color: "#0284c7" },
  { title: "Global Distribution", desc: "Cold chain logistics ensure product integrity from our Korean facility to clinics worldwide — maintaining potency across 10+ countries and 10 currencies.", image: "/images/icons/process/global-distribution.jpg", color: "#0369a1" },
]

const processSteps = [
  { step: "01", title: "Cell Sourcing", desc: "Premium cell lines derived from human umbilical cord mesenchymal stem cells (hUC-MSCs) and other specialized sources for maximum regenerative potential.", image: "/images/icons/process/cell-sourcing.jpg" },
  { step: "02", title: "Exosome Isolation", desc: "Proprietary purification technology isolates exosomes with maximum bioactivity and batch-to-batch consistency using advanced ultracentrifugation.", image: "/images/icons/process/exosome-isolation.png" },
  { step: "03", title: "Quality Analysis", desc: "Multi-stage testing including nanoparticle tracking analysis, protein quantification, endotoxin screening, and sterility validation.", image: "/images/icons/process/quality-analysis.jpg" },
  { step: "04", title: "Lyophilization", desc: "Advanced freeze-drying process preserves exosome integrity while enabling long-term storage and global distribution without degradation.", image: "/images/icons/process/lyophilization.jpg" },
  { step: "05", title: "Clinical Delivery", desc: "Final products packaged under GMP standards for professional clinical use in regenerative medicine and aesthetic dermatology.", image: "/images/icons/process/clinical-delivery.png" },
]

const qualityStandards = [
  { value: "10–150nm", label: "Nanoscale Vesicles" },
  { value: "100+", label: "Bioactive Molecules" },
  { value: "10B–60B+", label: "Particles Per Vial" },
  { value: "99.9%", label: "Purity Standard" },
]

export default function ResearchClient() {
  const hero = useInView(0.1, "0px")
  const overview = useInView(0.25)
  const galleryHeader = useInView(0.3)
  const gallery = useInView(0.15)
  const highlights = useInView(0.2)
  const features = useInView(0.2)
  const processSection = useInView(0.15)
  const cta = useInView(0.3)

  const mouse = useMouseParallax(0.015)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openImage = useCallback((index: number) => setSelectedImage(index), [])
  const closeImage = useCallback(() => setSelectedImage(null), [])

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            HERO SECTION - Animates on page load (first visible section)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="relative min-h-[100dvh] md:min-h-[100vh] flex items-center justify-center bg-transparent">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#0ea5e9]/[0.04] blur-3xl"
              style={{ transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)` }} />
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl"
              style={{ transform: `translate(${mouse.x * -0.3}px, ${mouse.y * -0.3}px)` }} />
            {[12, 25, 40, 55, 70, 85].map((x, i) => (
              <FloatingParticle key={i} delay={i * 1.2} x={x} size={3 + (i % 3) * 2} />
            ))}
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center z-10" ref={hero.ref}>
            <div style={{ opacity: hero.visible ? 1 : 0, transform: `translateY(${hero.visible ? 0 : 30}px)`, transition: "opacity 1.2s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 1.2s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
              <span className="text-xs text-[#38bdf8] font-semibold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-5 py-2 rounded-full border border-[#0ea5e9]/10 inline-block mb-5">
                Advanced Exosome Platform
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#0f172a] leading-tight mb-6"
              style={{ opacity: hero.visible ? 1 : 0, transform: `translateY(${hero.visible ? 0 : 40}px)`, transition: "opacity 1.3s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 1.3s cubic-bezier(0.22,1,0.36,1) 0.3s" }}>
              Research <span className="text-[#38bdf8]">&amp;</span> <br className="hidden sm:block" />Technology
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ opacity: hero.visible ? 1 : 0, transform: `translateY(${hero.visible ? 0 : 25}px)`, transition: "opacity 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s" }}>
              Scientifically engineered exosome solutions powered by cutting-edge research,
              advanced purification technology, and rigorous quality standards — designed for
              regenerative medicine and aesthetic dermatology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ opacity: hero.visible ? 1 : 0, transform: `translateY(${hero.visible ? 0 : 20}px)`, transition: "opacity 1.2s cubic-bezier(0.22,1,0.36,1) 0.7s, transform 1.2s cubic-bezier(0.22,1,0.36,1) 0.7s" }}>
              <a href="#overview" className="inline-flex items-center px-6 md:px-8 py-3.5 rounded-full bg-[#0ea5e9] text-white text-sm font-semibold hover:bg-[#0284c7] transition-all duration-300">
                Explore Research
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>
              <a href="#gallery" className="inline-flex items-center px-6 md:px-8 py-3.5 rounded-full border border-[#cbd5e1] text-[#334155] text-sm font-semibold hover:border-[#38bdf8]/30 hover:text-[#38bdf8] transition-all duration-300">
                View Documentation
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: hero.visible ? 1 : 0, transition: "opacity 0.8s ease 1s" }}>
            <span className="text-[10px] text-[#94a3b8] tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 border-2 border-[#cbd5e1] rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-[#94a3b8] rounded-full animate-[scrollBounce_1.5s_infinite]" />
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            OVERVIEW SECTION - Slide from left + scale
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="overview" className="relative bg-transparent py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#0ea5e9]/[0.02] blur-3xl" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 z-10">
            <div ref={overview.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left card - slides in from left with perspective */}
              <div style={{
                opacity: overview.visible ? 1 : 0,
                transform: overview.visible ? "translateX(0) perspective(1000px) rotateY(0deg)" : "translateX(-80px) perspective(1000px) rotateY(8deg)",
                transition: "opacity 1.4s cubic-bezier(0.22,1,0.36,1), transform 1.4s cubic-bezier(0.22,1,0.36,1)",
              }}>
                <div className="glass-card relative rounded-2xl overflow-hidden bg-white border border-[#e2e8f0]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0ea5e9] via-[#38bdf8] to-[#0284c7]" />
                  <div className="p-8 md:p-10">
                    <span className="inline-block text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full mb-4"
                      style={{ opacity: overview.visible ? 1 : 0, transform: `translateY(${overview.visible ? 0 : 20}px)`, transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s" }}>
                      EverCeutical Research
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-2 leading-tight"
                      style={{ opacity: overview.visible ? 1 : 0, transform: `translateY(${overview.visible ? 0 : 25}px)`, transition: "opacity 1.1s ease 0.55s, transform 1.1s ease 0.55s" }}>
                      Korean Exosome <span className="text-[#38bdf8]">Biotechnology</span>
                    </h2>
                    <p className="text-sm text-[#0ea5e9] font-medium mb-5 tracking-wide"
                      style={{ opacity: overview.visible ? 1 : 0, transform: `translateY(${overview.visible ? 0 : 20}px)`, transition: "opacity 1s ease 0.7s, transform 1s ease 0.7s" }}>
                      Backed by Vesco Science Co., Ltd.
                    </p>
                    <p className="text-[#334155] text-sm md:text-[15px] leading-relaxed mb-8"
                      style={{ opacity: overview.visible ? 1 : 0, transform: `translateY(${overview.visible ? 0 : 20}px)`, transition: "opacity 1s ease 0.85s, transform 1s ease 0.85s" }}>
                      At EverCeutical, we pioneer a smarter, science-driven future in aesthetics —
                      with exosomes at the core of our innovation. Our mission is to deliver visible,
                      lasting skin health results through regenerative biotechnology.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {qualityStandards.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 bg-[#f8fafc] rounded-xl px-4 py-3 border border-[#e2e8f0] transition-all duration-300 hover:border-[#0ea5e9]/30"
                          style={{ opacity: overview.visible ? 1 : 0, transform: `translateY(${overview.visible ? 0 : 20}px)`, transition: `opacity 0.9s ease ${0.9 + i * 0.12}s, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) ${0.9 + i * 0.12}s` }}>
                          <div className="w-8 h-8 rounded-lg bg-[#0ea5e9]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#0ea5e9] text-sm font-bold">{s.value.replace(/[^0-9]/g, '').slice(0,2)}</span>
                          </div>
                          <div>
                            <span className="text-[13px] font-bold text-[#0f172a] block leading-tight">{s.value}</span>
                            <span className="text-[11px] text-[#64748b] leading-tight">{s.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right diagram - Exosome Cellular Network */}
              <div className="hidden lg:block"
                style={{
                  opacity: overview.visible ? 1 : 0,
                  transform: overview.visible ? "translateX(0) scale(1)" : "translateX(80px) scale(0.8)",
                  transition: "opacity 1.4s ease 0.3s, transform 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s",
                }}>
                <div className="relative h-[340px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] border border-[#0ea5e9]/10">
                  {/* Animated Cells */}
                  <div className="absolute" style={{ top: "20%", left: "15%", animation: "float 6s ease-in-out infinite" }}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0ea5e9]/20 to-[#38bdf8]/10 border-2 border-[#0ea5e9]/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#0ea5e9]/30" />
                    </div>
                  </div>
                  <div className="absolute" style={{ top: "55%", left: "60%", animation: "float 8s ease-in-out infinite 1s" }}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22c55e]/20 to-[#16a34a]/10 border-2 border-[#22c55e]/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#22c55e]/30" />
                    </div>
                  </div>
                  <div className="absolute" style={{ top: "15%", right: "20%", animation: "float 7s ease-in-out infinite 0.5s" }}>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#9333ea]/10 border-2 border-[#a855f7]/30 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#a855f7]/30" />
                    </div>
                  </div>
                  {/* Exosome Particles */}
                  {[
                    { x: "25%", y: "35%", size: "w-3 h-3", delay: "0s", color: "#0ea5e9" },
                    { x: "45%", y: "25%", size: "w-2 h-2", delay: "0.5s", color: "#38bdf8" },
                    { x: "65%", y: "45%", size: "w-3 h-3", delay: "1s", color: "#22c55e" },
                    { x: "35%", y: "65%", size: "w-2 h-2", delay: "1.5s", color: "#a855f7" },
                    { x: "55%", y: "70%", size: "w-3 h-3", delay: "2s", color: "#0ea5e9" },
                    { x: "75%", y: "30%", size: "w-2 h-2", delay: "2.5s", color: "#38bdf8" },
                    { x: "20%", y: "50%", size: "w-2 h-2", delay: "3s", color: "#22c55e" },
                    { x: "80%", y: "60%", size: "w-3 h-3", delay: "3.5s", color: "#a855f7" },
                  ].map((p, i) => (
                    <div key={i} className="absolute rounded-full"
                      style={{
                        left: p.x,
                        top: p.y,
                        width: p.size.includes("w-3") ? "12px" : "8px",
                        height: p.size.includes("w-3") ? "12px" : "8px",
                        backgroundColor: p.color,
                        opacity: 0.6,
                        animation: `particleFloat 4s ease-in-out ${p.delay} infinite`,
                      }} />
                  ))}
                  {/* Connection Lines (SVG) */}
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
                    <line x1="25%" y1="30%" x2="45%" y2="30%" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="45%" y1="30%" x2="65%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="65%" y1="50%" x2="70%" y2="25%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="25%" y1="30%" x2="35%" y2="70%" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                  {/* Center Info */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-[#e2e8f0]">
                      <p className="text-[11px] font-bold text-[#0ea5e9] mb-0.5">Intercellular Signaling</p>
                      <p className="text-[9px] text-[#64748b]">Exosome-Mediated Communication</p>
                    </div>
                  </div>
                  {/* Floating Labels */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                    <p className="text-[8px] font-bold text-[#0ea5e9]">SOURCE CELL</p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                    <p className="text-[8px] font-bold text-[#22c55e]">TARGET CELL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            DOCUMENT SECTION - Single PDF as scrollable pages
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="gallery" className="relative bg-transparent py-14 md:py-18 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#0ea5e9]/[0.02] blur-[120px]" />
          </div>

          <div className="w-full max-w-4xl mx-auto px-6 z-10 relative">
            <div ref={galleryHeader.ref} className="text-center mb-8"
              style={{ opacity: galleryHeader.visible ? 1 : 0, transform: `translateY(${galleryHeader.visible ? 0 : 50}px) scale(${galleryHeader.visible ? 1 : 0.9})`, transition: "opacity 1.3s cubic-bezier(0.22,1,0.36,1), transform 1.3s cubic-bezier(0.22,1,0.36,1)" }}>
              <span className="text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full inline-block mb-4">Scientific Documentation</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mt-3 mb-2 leading-tight">
                Research <span className="text-[#38bdf8]">&amp;</span> Documentation
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Access our comprehensive exosome technology research paper covering
                advanced purification methods, clinical applications, and manufacturing processes.
              </p>
            </div>

            <div ref={gallery.ref}
              style={{ opacity: gallery.visible ? 1 : 0, transform: `translateY(${gallery.visible ? 0 : 40}px)`, transition: "opacity 0.8s ease, transform 0.8s ease" }}>
              {/* Document Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0f172a]">Exosome Technology Research Paper</h3>
                    <p className="text-[11px] text-[#64748b]">{researchImages.length} Pages • Scientific Document</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#38bdf8] font-bold tracking-wider uppercase hidden sm:block">Scroll to read</span>
              </div>

              {/* Document Pages - Scrollable */}
              <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] bg-white shadow-lg">
                <div
                  className="max-h-[600px] overflow-y-auto scroll-smooth"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#0ea5e9 transparent" }}
                  onWheel={(e) => {
                    const el = e.currentTarget
                    const atTop = el.scrollTop === 0
                    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
                    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
                      return
                    }
                    e.stopPropagation()
                  }}
                >
                  {researchImages.map((img, i) => (
                    <div key={i} className="relative border-b border-[#e2e8f0] last:border-b-0">
                      <img
                        src={img}
                        alt={`Page ${i + 1}`}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                      {/* Page Number */}
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/40 text-[9px] text-white font-medium">
                        {i + 1} / {researchImages.length}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Scroll indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>

              {/* Page Counter */}
              <div className="mt-4 text-center">
                <span className="text-[11px] text-[#94a3b8]">
                  Showing {researchImages.length} pages of research documentation
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            HIGHLIGHTS SECTION - Cards pop in with bounce + rotation
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="relative bg-transparent py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl" />
            <div className="absolute -bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-[#0ea5e9]/[0.02] blur-3xl" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 z-10">
            <div ref={highlights.ref} className="text-center mb-8"
              style={{ opacity: highlights.visible ? 1 : 0, transform: `translateY(${highlights.visible ? 0 : 50}px)`, transition: "opacity 1.3s cubic-bezier(0.22,1,0.36,1), transform 1.3s cubic-bezier(0.22,1,0.36,1)" }}>
              <span className="text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full inline-block">Why EverCeutical</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mt-3 mb-2 leading-tight">
                Research <span className="text-[#38bdf8]">Highlights</span>
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                What sets our exosome technology apart — from proprietary extraction to global clinical delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {researchHighlights.map((item, i) => (
                <HighlightCard key={i} item={item} index={i} visible={highlights.visible} />
              ))}
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FEATURES SECTION - Cards rise up with stagger + glow
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="features" className="relative bg-transparent py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl" />
            <div className="absolute -bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-[#0ea5e9]/[0.02] blur-3xl" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 z-10">
            <div ref={features.ref} className="text-center mb-8"
              style={{ opacity: features.visible ? 1 : 0, transform: `translateY(${features.visible ? 0 : 50}px)`, transition: "opacity 1.3s cubic-bezier(0.22,1,0.36,1), transform 1.3s cubic-bezier(0.22,1,0.36,1)" }}>
              <span className="text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full inline-block">Platform Capabilities</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mt-3 mb-2 leading-tight">
                Core <span className="text-[#38bdf8]">Technologies</span>
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Advanced exosome platform engineered for consistency, safety, and therapeutic efficacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { image: "/images/icons/cellular-communication.png", title: "Cellular Communication", desc: "Exosomes facilitate biological signaling between cells, carrying growth factors, cytokines, and microRNA payloads that instruct damaged tissue to initiate repair." },
                { image: "/images/icons/Laboratory- Engineered.png", title: "Laboratory Engineered", desc: "Produced under strictly controlled GMP protocols using proprietary isolation and purification technologies to ensure maximum bioactivity." },
                { image: "/images/icons/quality assurance.png", title: "Quality Assurance", desc: "Every batch undergoes rigorous analytical testing including nanoparticle tracking analysis, protein quantification, sterility validation." },
                { image: "/images/icons/Regenerative Potential.png", title: "Regenerative Potential", desc: "Designed to support tissue repair, reduce inflammation, and enhance cellular recovery across dermatological and therapeutic applications." },
                { image: "/images/icons/cell soucre.png", title: "Cell Sources", desc: "Derived from human umbilical cord mesenchymal stem cells (hUC-MSCs), adipose tissue, fibroblasts, and lab-engineered cell lines." },
                { image: "/images/icons/Research-Driven.png", title: "Research-Driven", desc: "Backed by peer-reviewed clinical research and continuously validated through ongoing studies to meet the highest evidence-based standards." },
              ].map((f, i) => (
                <FeatureCard key={i} feature={f} index={i} visible={features.visible} />
              ))}
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            PROCESS SECTION - Steps slide in alternating + connector draws
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="process" className="relative bg-transparent py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl" />
            <div className="absolute bottom-1/3 left-0 w-[350px] h-[350px] rounded-full bg-[#0ea5e9]/[0.02] blur-3xl" />
            {[18, 35, 52, 68, 82].map((x, i) => (
              <FloatingParticle key={i} delay={i * 1.5 + 0.5} x={x} size={3 + (i % 2) * 2} />
            ))}
          </div>

          <div className="w-full max-w-6xl mx-auto px-6 z-10">
            <div ref={processSection.ref} className="text-center mb-8"
              style={{ opacity: processSection.visible ? 1 : 0, transform: `translateY(${processSection.visible ? 0 : 50}px)`, transition: "opacity 1.3s cubic-bezier(0.22,1,0.36,1), transform 1.3s cubic-bezier(0.22,1,0.36,1)" }}>
              <span className="text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full inline-block">How We Work</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mt-3 mb-2 leading-tight">
                Our Research <span className="text-[#38bdf8]">Process</span>
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                From cell sourcing to clinical delivery — every step meticulously controlled.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
                <div className="w-full h-full bg-gradient-to-b from-[#0ea5e9]/20 via-[#0ea5e9]/40 to-[#0ea5e9]/20"
                  style={{ clipPath: processSection.visible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", transition: "clip-path 2.5s cubic-bezier(0.22,1,0.36,1) 0.5s" }} />
              </div>
              <div className="space-y-4 md:space-y-6 lg:space-y-0">
                {processSteps.map((step, i) => (
                  <ProcessStep key={i} step={step} index={i} visible={processSection.visible} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CTA SECTION - Glass card scales in
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="relative bg-transparent py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl" />
          </div>

          <div className="w-full max-w-4xl mx-auto px-6 z-10 relative">
            <div ref={cta.ref} style={{ opacity: cta.visible ? 1 : 0, transform: `translateY(${cta.visible ? 0 : 60}px) scale(${cta.visible ? 1 : 0.9})`, transition: "opacity 1.5s cubic-bezier(0.22,1,0.36,1), transform 1.5s cubic-bezier(0.22,1,0.36,1)" }}>
              <div className="glass-card relative rounded-2xl p-6 md:p-10 lg:p-14 text-center overflow-hidden bg-white border border-[#e2e8f0]">
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
                <span className="inline-block text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full mb-3"
                  style={{ opacity: cta.visible ? 1 : 0, transform: `translateY(${cta.visible ? 0 : 15}px)`, transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s" }}>Get Started</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-4 leading-tight"
                  style={{ opacity: cta.visible ? 1 : 0, transform: `translateY(${cta.visible ? 0 : 20}px)`, transition: "opacity 1.1s ease 0.55s, transform 1.1s ease 0.55s" }}>
                  Explore Our <span className="text-[#38bdf8]">Products</span>
                </h2>
                <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-5"
                  style={{ opacity: cta.visible ? 1 : 0, transform: `translateY(${cta.visible ? 0 : 20}px)`, transition: "opacity 1s ease 0.7s, transform 1s ease 0.7s" }}>
                  Discover our range of advanced exosome formulations designed for professional clinical use.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  style={{ opacity: cta.visible ? 1 : 0, transform: `translateY(${cta.visible ? 0 : 20}px)`, transition: "opacity 1s ease 0.85s, transform 1s ease 0.85s" }}>
                  <Link href="/#products" className="inline-flex items-center gap-2 bg-[#0ea5e9] text-white text-sm font-semibold px-6 md:px-8 py-3.5 rounded-full hover:bg-[#0284c7] transition-all duration-300">
                    View Products
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link href="/about-us" className="inline-flex items-center gap-2 border border-[#cbd5e1] text-[#334155] text-sm font-semibold px-6 md:px-8 py-3.5 rounded-full hover:border-[#38bdf8]/30 hover:text-[#38bdf8] transition-all duration-300">
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {selectedImage !== null && (
        <ImageModal images={researchImages} currentIndex={selectedImage} onClose={closeImage} onNavigate={setSelectedImage} />
      )}
    </>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    RESEARCH CARD - 3D tilt with mouse tracking
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ResearchCard({ img, index, visible, onClick }: { img: string; index: number; visible: boolean; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * -15, y: (x - 0.5) * 15 })
  }

  return (
    <div ref={cardRef} className="group relative shrink-0 w-[250px] md:w-[280px] lg:w-[320px] snap-center cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateX(0) perspective(800px) rotateY(${tilt.y}deg) rotateX(${tilt.x}deg)`
          : `translateX(100px) perspective(800px) rotateY(15deg) rotateX(0deg)`,
        transition: visible ? "transform 0.15s ease-out" : `opacity 1s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.08}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.08}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false) }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false) }}
      onClick={onClick}>
      <div className="glass-card relative rounded-2xl overflow-hidden h-[380px] md:h-[420px] bg-white border border-[#e2e8f0]"
        style={{
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}>
        <div className="relative h-[65%] overflow-hidden">
          <img src={img} alt={`Research Document ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700" style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-400"
              style={{ background: isHovered ? "rgba(14,165,233,0.9)" : "rgba(255,255,255,0.85)", color: isHovered ? "white" : "#0f172a", backdropFilter: "blur(8px)", boxShadow: "none" }}>
              Doc {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          <div className="absolute top-4 right-4 transition-all duration-400" style={{ opacity: isHovered ? 1 : 0, transform: `scale(${isHovered ? 1 : 0.5})` }}>
            <div className="w-9 h-9 rounded-full bg-white/[0.1] backdrop-blur-sm flex items-center justify-center">
              <svg className="w-4 h-4 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            </div>
          </div>
        </div>
        <div className="relative p-5 h-[35%] flex flex-col justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#0f172a] mb-1.5 leading-snug">Research Document {String(index + 1).padStart(2, "0")}</h3>
            <p className="text-[11px] text-[#64748b] leading-relaxed line-clamp-2">Exosome technology research paper covering advanced purification methods, clinical applications, and therapeutic outcomes.</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /><span className="text-[10px] text-[#38bdf8] font-semibold tracking-wide uppercase">PDF</span></div>
            <div className="flex items-center gap-1 text-[#38bdf8] transition-all duration-300" style={{ transform: isHovered ? "translateX(3px)" : "translateX(0)" }}>
              <span className="text-[11px] font-semibold">View</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full transition-all duration-500"
            style={{ background: isHovered ? "linear-gradient(to right, transparent, #0ea5e9, transparent)" : "linear-gradient(to right, transparent, transparent, transparent)" }} />
        </div>
      </div>
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    IMAGE MODAL - Full viewer with thumbnails + swipe
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ImageModal({ images, currentIndex, onClose, onNavigate }: { images: string[]; currentIndex: number; onClose: () => void; onNavigate: (i: number) => void }) {
  const [touchStart, setTouchStart] = useState<number | null>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onNavigate(Math.max(0, currentIndex - 1))
      if (e.key === "ArrowRight") onNavigate(Math.min(images.length - 1, currentIndex + 1))
    }
    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", handleEsc); document.body.style.overflow = "" }
  }, [onClose, onNavigate, currentIndex, images.length])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "fadeIn 0.3s ease" }}>
      <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-[110] bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
        <span className="text-[#64748b] text-xs font-medium">{currentIndex + 1} / {images.length}</span>
      </div>
      {currentIndex > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1) }} className="absolute left-2 md:left-6 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1) }} className="absolute right-2 md:right-6 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
      <div className="relative max-w-5xl max-h-[85vh] w-full mx-4 md:mx-8" onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => { if (touchStart !== null) { const d = touchStart - e.changedTouches[0].clientX; if (Math.abs(d) > 50) { if (d > 0 && currentIndex < images.length - 1) onNavigate(currentIndex + 1); if (d < 0 && currentIndex > 0) onNavigate(currentIndex - 1) } setTouchStart(null) } }}
        style={{ animation: "scaleIn 0.3s ease" }}>
        <img src={images[currentIndex]} alt={`Research Document ${currentIndex + 1}`} className="w-full h-full object-contain rounded-xl" key={currentIndex} />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] flex gap-1.5 p-2 bg-black/30 backdrop-blur-sm rounded-xl max-w-[90vw] overflow-x-auto">
        {images.map((img, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); onNavigate(i) }}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-300 ${i === currentIndex ? "ring-2 ring-white/60 scale-110" : "opacity-40 hover:opacity-70"}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    HIGHLIGHT CARD - Pop in with bounce + color accent
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function HighlightCard({ item, index, visible }: { item: { title: string; desc: string; image: string; color: string }; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isLeft = index % 2 === 0

  return (
    <div className="group relative rounded-2xl overflow-hidden"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)} onTouchEnd={() => setTimeout(() => setHovered(false), 300)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) translateY(0) scale(1) rotate(0deg)"
          : `translateX(${isLeft ? -80 : 80}px) translateY(40px) scale(0.9) rotate(${isLeft ? -3 : 3}deg)`,
        transition: `opacity 1.2s cubic-bezier(0.22,1,0.36,1) ${0.2 + index * 0.18}s, transform 1.2s cubic-bezier(0.34,1.56,0.64,1) ${0.2 + index * 0.18}s`,
        background: hovered ? `linear-gradient(135deg, rgba(255,255,255,1) 0%, ${item.color}08 100%)` : "rgba(249,250,251,1)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? item.color + "20" : "rgba(229,231,235,1)"}`,
        boxShadow: "none",
      }}>
      <div className="relative p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl shrink-0 transition-all duration-500 overflow-hidden"
            style={{
              transform: hovered ? "scale(1.15) rotate(-8deg)" : "scale(1) rotate(0deg)",
            }}>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[16px] font-bold text-[#0f172a] mb-2 transition-colors duration-300" style={{ color: hovered ? item.color : undefined }}>
              {item.title}
            </h4>
            <p className="text-[13px] text-[#334155] leading-[1.7]">{item.desc}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-6 right-6 h-[2px] transition-all duration-500"
          style={{ background: hovered ? `linear-gradient(to right, transparent, ${item.color}40, transparent)` : "linear-gradient(to right, transparent, transparent, transparent)" }} />
      </div>
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    FEATURE CARD - Rise up with glow on hover
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function FeatureCard({ feature, index, visible }: { feature: { image: string; title: string; desc: string }; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="group relative rounded-xl overflow-hidden"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)} onTouchEnd={() => setTimeout(() => setHovered(false), 300)}
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 60}px) scale(${visible ? 1 : 0.92})`,
        transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.14}s, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.14}s`,
        background: hovered ? "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)" : "rgba(249,250,251,1)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${hovered ? "rgba(14,165,233,0.15)" : "rgba(229,231,235,1)"}`,
        boxShadow: "none",
      }}>
      <div className="p-6">
        <div className="w-11 h-11 rounded-xl mb-4 ring-2 ring-[#0ea5e9]/20 group-hover:ring-[#0ea5e9]/40 transition-all duration-300 overflow-hidden">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <h4 className="text-[15px] font-bold text-[#0f172a] mb-2">{feature.title}</h4>
        <p className="text-[13px] text-[#334155] leading-relaxed">{feature.desc}</p>
        <div className="absolute bottom-0 left-6 right-6 h-[1.5px] transition-all duration-500"
          style={{ background: hovered ? "linear-gradient(to right, transparent, rgba(14,165,233,0.3), transparent)" : "linear-gradient(to right, transparent, transparent, transparent)" }} />
      </div>
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    PROCESS STEP - Alternating slide + dot bounce
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ProcessStep({ step, index, visible }: { step: { step: string; title: string; desc: string; image: string }; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div className={`relative lg:flex lg:items-center lg:gap-8 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${isEven ? -80 : 80}px)`,
        transition: `opacity 1.2s cubic-bezier(0.22,1,0.36,1) ${0.25 + index * 0.22}s, transform 1.2s cubic-bezier(0.22,1,0.36,1) ${0.25 + index * 0.22}s`,
      }}>
      <div className={`lg:w-[calc(50%-2rem)] ${isEven ? "lg:text-right" : "lg:text-left"}`}>
        <div className="relative rounded-xl overflow-hidden p-6 cursor-default"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)} onTouchEnd={() => setTimeout(() => setHovered(false), 300)}
          style={{
            background: hovered ? "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)" : "rgba(249,250,251,1)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${hovered ? "rgba(14,165,233,0.15)" : "rgba(229,231,235,1)"}`,
            boxShadow: "none",
          }}>
          <div className={`flex items-center gap-3 mb-3 ${isEven ? "lg:justify-end" : ""}`}>
            <div className="w-10 h-10 rounded-lg transition-all duration-500 overflow-hidden bg-white"
              style={{
                transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1)",
              }}>
              <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#38bdf8] tracking-widest uppercase">Step {step.step}</p>
              <h4 className="text-[15px] font-bold text-[#0f172a]">{step.title}</h4>
            </div>
          </div>
          <p className="text-[13px] text-[#334155] leading-relaxed">{step.desc}</p>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center w-8 shrink-0">
        <div className="w-4 h-4 rounded-full bg-[#0ea5e9] transition-all duration-500"
          style={{
            transform: visible ? (hovered ? "scale(1.5)" : "scale(1)") : "scale(0)",
            boxShadow: "none",
            transition: `transform 0.8s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + index * 0.22}s`,
          }} />
      </div>

      <div className="hidden md:block lg:w-[calc(50%-2rem)]" />
    </div>
  )
}






