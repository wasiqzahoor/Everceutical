"use client"

import { useEffect, useRef, useState } from "react"

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  )
}

export default function ExogenesisScalpSections({ product }: { product: any }) {
  const isScalp = product.id.includes("scalp")

  const brochureImage = isScalp
    ? "/images/brochures/ExoGenesis-Scalp-Brochure.PNG"
    : "/images/brochures/ExoGenesis-vital.PNG"
  const brochurePdf = isScalp
    ? "/images/brochures/ExoGenesis-scalp.pdf"
    : "/images/brochures/ExoGenesis-vital.pdf"
  const brochureName = isScalp ? "Exogenesis Scalp" : "Exogenesis Vital"

  return (
    <div>
      {/* ── Product Brochure ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-sm mx-auto">
          <FadeIn>
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden text-center">
              <div className="px-6 pt-6 pb-0">
                <h3 className="text-lg font-bold text-white mb-1">Product Brochure</h3>
                <p className="text-[12px] text-white/70">Download the official brochure for detailed information.</p>
              </div>
              <div className="px-5 py-4">
                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={brochureImage}
                    alt={`${brochureName} Brochure Preview`}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Click to Download</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <a
                  href={brochurePdf}
                  download={`${brochureName}-Brochure.pdf`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-[12px] font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Brochure (PDF)
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
