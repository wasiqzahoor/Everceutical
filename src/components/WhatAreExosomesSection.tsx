"use client"

import { useState, useEffect, useRef } from "react"
import { exosomeTechnology } from "@/data/siteData"

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
      { threshold: isMobile ? 0.01 : threshold, rootMargin: isMobile ? "400px 0px 0px 0px" : "0px 0px -20px 0px" }
    )
    obs.observe(el)
    const timer = isMobile ? setTimeout(() => setVisible(true), 500) : setTimeout(() => setVisible(true), 2000)
    return () => { obs.disconnect(); clearTimeout(timer) }
  }, [threshold, rootMargin])

  return { ref, visible }
}

export default function WhatAreExosomesSection() {
  const hero = useInView(0.2)
  const cards = useInView(0.1)
  const stats = useInView(0.2)
  const cta = useInView(0.2)

  const { features, stats: statItems } = exosomeTechnology

  return (
    <section
      id="learn"
      className="relative bg-transparent pt-10 pb-8 md:pt-14 md:pb-7 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0ea5e9]/[0.04] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#0369a1]/[0.03] blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 z-10">
        {/*  HERO PANEL  */}
        <div
          ref={hero.ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-6"
        >
          {/* Left: Premium glass content card */}
          <div
            className="relative"
            style={{
              opacity: hero.visible ? 1 : 0,
              transform: hero.visible ? "translateX(0) scale(1)" : "translateX(-60px) scale(0.95)",
              filter: hero.visible ? "blur(0px)" : "blur(6px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Glass card */}
            <div className="relative glass-surface-strong rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden">
              {/* Accent line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent" />

              <span className="inline-block text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.1] px-4 py-1.5 rounded-full mb-3 border border-[#0ea5e9]/20">
                {exosomeTechnology.hero.label}
              </span>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
                {exosomeTechnology.hero.title}
              </h2>

              <p className="text-sm text-[#38bdf8] font-medium mb-5 tracking-wide">
                {exosomeTechnology.hero.subtitle}
              </p>

              <p className="text-[#334155] text-sm md:text-[15px] leading-relaxed mb-5">
                {exosomeTechnology.hero.description}
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3">
                {statItems.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[#f8fafc] backdrop-blur-sm rounded-full px-4 py-2 border border-[#e2e8f0]"
                    style={{
                      opacity: hero.visible ? 1 : 0,
                      transform: hero.visible ? "translateY(0) scale(1)" : "translateY(25px) scale(0.8)",
                      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i * 0.1}s`,
                    }}
                  >
                    <span className="text-[13px] font-bold text-[#0f172a]">{s.value}</span>
                    <span className="text-[11px] text-[#64748b]">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Exosome Structure Diagram — Minimalist */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{
              opacity: hero.visible ? 1 : 0,
              transform: hero.visible ? "translateX(0) scale(1)" : "translateX(60px) scale(0.95)",
              filter: hero.visible ? "blur(0px)" : "blur(6px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s, filter 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <div className="relative w-full max-w-[440px] aspect-square">
              {/* Soft glow backdrop */}
              <div className="absolute inset-[15%] rounded-full bg-[#0ea5e9]/[0.06] blur-[50px]" />

              <svg viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full h-full" suppressHydrationWarning>
                <defs>
                  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>

                  <radialGradient id="coreGrad" cx="45%" cy="40%">
                    <stop offset="0%" stopColor="#e0f7ff" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#b0ecff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.15" />
                  </radialGradient>

                  <radialGradient id="membraneGrad" cx="45%" cy="40%">
                    <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                  </radialGradient>

                  <linearGradient id="rnaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>

                  <linearGradient id="labelLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                  </linearGradient>

                  <linearGradient id="labelLineL" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* â•â•â• OUTER MEMBRANE RING â•â•â• */}
                <circle cx="220" cy="220" r="155" fill="none" stroke="url(#membraneGrad)" strokeWidth="18" opacity="0.5" />

                {/* Phospholipid heads — outer ring (clean dots) */}
                {Array.from({ length: 36 }).map((_, i) => {
                  const angle = (i / 36) * Math.PI * 2
                  const x = Math.round((220 + Math.cos(angle) * 155) * 100) / 100
                  const y = Math.round((220 + Math.sin(angle) * 155) * 100) / 100
                  return (
                    <circle key={`oh-${i}`} cx={x} cy={y} r={3} fill="#7dd3fc" opacity={0.6} suppressHydrationWarning />
                  )
                })}

                {/* Phospholipid heads — inner ring */}
                {Array.from({ length: 36 }).map((_, i) => {
                  const angle = (i / 36) * Math.PI * 2 + 0.09
                  const x = Math.round((220 + Math.cos(angle) * 140) * 100) / 100
                  const y = Math.round((220 + Math.sin(angle) * 140) * 100) / 100
                  return (
                    <circle key={`ih-${i}`} cx={x} cy={y} r={2.5} fill="#93c5fd" opacity={0.45} suppressHydrationWarning />
                  )
                })}

                {/* Inner fill */}
                <circle cx="220" cy="220" r="132" fill="url(#coreGrad)" />

                {/* â•â•â• RNA STRANDS (minimal, elegant) â•â•â• */}
                <g opacity="0.8">
                  <path d="M170 200 Q195 180 220 200 Q245 220 270 200 Q295 180 310 195" fill="none" stroke="url(#rnaGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4">
                    <animate attributeName="stroke-dashoffset" values="0;-20" dur="4s" repeatCount="indefinite" />
                  </path>
                  <path d="M175 250 Q200 232 225 250 Q250 268 275 250" fill="none" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" opacity="0.5" strokeDasharray="5 5">
                    <animate attributeName="stroke-dashoffset" values="0;-20" dur="5s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* â•â•â• CARGO PROTEINS (clean circles) â•â•â• */}
                <circle cx="195" cy="230" r="14" fill="#7dd3fc" opacity="0.25" />
                <circle cx="195" cy="230" r="8" fill="#93c5fd" opacity="0.35" />
                <circle cx="255" cy="218" r="7" fill="#60a5fa" opacity="0.3" />
                <circle cx="240" cy="265" r="5" fill="#93c5fd" opacity="0.25" />
                <circle cx="185" cy="260" r="6" fill="#7dd3fc" opacity="0.28" />

                {/* â•â•â• SURFACE RECEPTORS (clean T-shapes) â•â•â• */}
                {[40, 110, 200, 290, 350].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180
                  const r2 = (v: number) => Math.round(v * 100) / 100
                  const bx = r2(220 + Math.cos(rad) * 148)
                  const by = r2(220 + Math.sin(rad) * 148)
                  const tx = r2(220 + Math.cos(rad) * 175)
                  const ty = r2(220 + Math.sin(rad) * 175)
                  const perpX = r2(Math.cos(rad + Math.PI / 2) * 8)
                  const perpY = r2(Math.sin(rad + Math.PI / 2) * 8)
                  return (
                    <g key={`rec-${i}`} opacity={0.7}>
                      <line x1={bx} y1={by} x2={tx} y2={ty} stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
                      <line x1={tx} y1={ty} x2={r2(tx + perpX)} y2={r2(ty + perpY)} stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1={tx} y1={ty} x2={r2(tx - perpX)} y2={r2(ty - perpY)} stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx={r2(tx + perpX)} cy={r2(ty + perpY)} r="2.5" fill="#e0f2fe" />
                      <circle cx={r2(tx - perpX)} cy={r2(ty - perpY)} r="2.5" fill="#e0f2fe" />
                    </g>
                  )
                })}

                {/* â•â•â• LABELS â•â•â• */}
                {/* Right: LIPID BILAYER */}
                <g opacity={hero.visible ? 1 : 0} style={{ transition: "opacity 1s ease 0.8s" }}>
                  <line x1="380" y1="145" x2="330" y2="180" stroke="url(#labelLine)" strokeWidth="1" />
                  <circle cx="330" cy="180" r="2.5" fill="#38bdf8" />
                  <text x="385" y="140" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">LIPID BILAYER</text>
                  <text x="385" y="152" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">Membrane Shell</text>
                </g>

                {/* Right lower: SURFACE PROTEINS */}
                <g opacity={hero.visible ? 1 : 0} style={{ transition: "opacity 1s ease 1s" }}>
                  <line x1="385" y1="275" x2="335" y2="250" stroke="url(#labelLine)" strokeWidth="1" />
                  <circle cx="335" cy="250" r="2.5" fill="#38bdf8" />
                  <text x="390" y="270" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">SURFACE</text>
                  <text x="390" y="282" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">Receptor Proteins</text>
                </g>

                {/* Left: RNA CARGO */}
                <g opacity={hero.visible ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.3s" }}>
                  <line x1="52" y1="185" x2="155" y2="195" stroke="url(#labelLineL)" strokeWidth="1" />
                  <circle cx="155" cy="195" r="2.5" fill="#f97316" />
                  <text x="10" y="180" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">RNA CARGO</text>
                  <text x="10" y="192" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">mRNA &amp; miRNA</text>
                </g>

                {/* Left lower: CARGO PROTEINS */}
                <g opacity={hero.visible ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.4s" }}>
                  <line x1="52" y1="275" x2="145" y2="248" stroke="url(#labelLineL)" strokeWidth="1" />
                  <circle cx="145" cy="248" r="2.5" fill="#38bdf8" />
                  <text x="6" y="270" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">CARGO PROTEINS</text>
                  <text x="6" y="282" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">Growth Factors &amp; Enzymes</text>
                </g>

                {/* Bottom: Size indicator */}
                <g opacity={hero.visible ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.5s" }}>
                  <line x1="170" y1="395" x2="170" y2="378" stroke="#94a3b8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="270" y1="395" x2="270" y2="378" stroke="#94a3b8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="170" y1="390" x2="270" y2="390" stroke="#94a3b8" strokeWidth="0.8" opacity="0.5" />
                  <text x="220" y="405" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">30–150 nm</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/*  FEATURE CARDS GRID  */}
        <div ref={cards.ref}>
          <div className="text-center mb-6">
            <span className="text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.1] px-4 py-1.5 rounded-full border border-[#0ea5e9]/20">
              Platform Capabilities
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] mt-4">
              Advanced Exosome Technology
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group relative glass-card rounded-xl p-4 sm:p-6 bg-white border border-[#e2e8f0]"
                style={{
                  opacity: cards.visible ? 1 : 0,
                  transform: cards.visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.85)",
                  transition: `opacity 1.0s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.1}s, transform 1.0s cubic-bezier(0.34,1.56,0.64,1) ${0.08 + i * 0.1}s, background 0.5s ease, border-color 0.5s ease`,
                }}
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl mb-4 ring-2 ring-[#0ea5e9]/20 group-hover:ring-[#0ea5e9]/40 transition-all duration-300 overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <h4 className="text-[15px] font-bold text-[#0f172a] mb-2">
                  {f.title}
                </h4>

                <p className="text-[13px] text-[#334155] leading-relaxed">
                  {f.desc}
                </p>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#38bdf8]/0 to-transparent group-hover:via-[#38bdf8]/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/*  BOTTOM CTA  */}
        <div
          ref={cta.ref}
          className="mt-4 text-center"
          style={{
            opacity: cta.visible ? 1 : 0,
            transform: `translateY(${cta.visible ? 0 : 20}px)`,
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <a
            href="/research-technology"
            className="inline-flex items-center gap-2 bg-[#0ea5e9] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#0284c7] transition-all duration-300"
          >
            Explore Research & Technology
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}


