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

export default function HyaliqueXSections({ product }: { product: any }) {
  const accent = product.accentColor || "#c9a84a"
  const specs: string[][] = product.specifications || []
  const range: any[] = product.productRange || []
  const molTech = product.molecularTech || { small: {}, large: {} }
  const benefits: any[] = product.keyBenefits || []

  return (
    <div className="text-white">
      {/* ── Product Specifications Table ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Technical</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Product Specifications</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/20 overflow-hidden">
              <table className="w-full text-left">
                <tbody>
                  {specs.map((row: string[], i: number) => (
                    <tr key={i} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "bg-white/5" : "bg-transparent"} hover:bg-white/10 transition-colors`}>
                      <td className="px-6 py-4 text-[13px] font-semibold text-white/70 w-[40%]">{row[0]}</td>
                      <td className="px-6 py-4 text-[13px] text-white/90">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Product Range Table ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Range</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Product Range</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/20 overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-white/15 border-b border-white/20">
                    <th className="px-6 py-4 text-[11px] font-bold tracking-wider uppercase text-white/80">Variant</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-wider uppercase text-white/80">Volume</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-wider uppercase text-white/80">HA Concentration</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-wider uppercase text-white/80">Type</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-wider uppercase text-white/80">Primary Application</th>
                  </tr>
                </thead>
                <tbody>
                  {range.map((r: any, i: number) => (
                    <tr key={i} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "bg-white/5" : "bg-transparent"} hover:bg-white/10 transition-colors`}>
                      <td className="px-6 py-4 text-[13px] font-medium text-white/90">{r.variant}</td>
                      <td className="px-6 py-4 text-[13px] text-white/70">{r.volume}</td>
                      <td className="px-6 py-4 text-[13px] text-white/70">{r.concentration}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${r.type === "Soft Filler" ? "bg-white/10 text-white/80" : "bg-white/20 text-white"}`}>
                          {r.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-white/70">{r.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Two Molecular-Weight Technologies ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Technology</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Two Molecular-Weight Technologies</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Small Molecular */}
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">{molTech.small?.title?.split(" \u2014 ")[0]}</h3>
                    <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Soft Filler</span>
                  </div>
                </div>
                <p className="text-[13px] text-white/70 leading-relaxed mb-5">{molTech.small?.description}</p>
                <div className="flex flex-wrap gap-2">
                  {molTech.small?.idealFor?.map((a: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/10 text-white/80">{a}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Large Molecular */}
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-white/20 p-8 bg-white/15 hover:bg-white/20 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">{molTech.large?.title?.split(" \u2014 ")[0]}</h3>
                    <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Hard Filler</span>
                  </div>
                </div>
                <p className="text-[13px] text-white/70 leading-relaxed mb-5">{molTech.large?.description}</p>
                <div className="flex flex-wrap gap-2">
                  {molTech.large?.idealFor?.map((a: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/15 text-white/90">{a}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Key Benefits ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Benefits</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Key Benefits</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {benefits.map((b: any, i: number) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl p-6 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  <h3 className="text-[14px] font-bold text-white mb-1.5">{b.title}</h3>
                  <p className="text-[12px] text-white/80 leading-relaxed">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Treatment Areas ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Treatment</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Treatment Areas</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md">
                <h3 className="text-[14px] font-bold text-white mb-4">Small Molecular HA</h3>
                <div className="space-y-2">
                  {["Lips", "Fine Lines", "Mid-face", "Volume Restoration"].map((area, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-white/10 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <span className="text-[13px] text-white/80">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md">
                <h3 className="text-[14px] font-bold text-white mb-4">Large Molecular HA</h3>
                <div className="space-y-2">
                  {["Chin", "Nose", "Jawline", "Facial Contouring"].map((area, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-white/10 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <span className="text-[13px] text-white/80">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Korean Made ── */}
      <section className="px-5 sm:px-6 py-12 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md text-center">
              <p className="text-[13px] text-white/70 mb-1">Manufactured by Vesco Science Co., Ltd.</p>
              <p className="text-[12px] text-white/60">Seongnam-si, Gyeonggi-do &middot; Republic of Korea</p>
              <p className="text-[11px] text-white/30 mt-2">Marketed by EverCeutical Private Limited</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Professional Use ── */}
      <section className="px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md text-center">
              <p className="text-[12px] text-white/60 uppercase tracking-widest font-bold">Professional Aesthetic Use Only</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Before & After Results ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Results</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Before & After</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>
          <div className="space-y-6">
            {/* Row 1: Both Before images side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FadeIn delay={0.1}>
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden">
                  <div className="relative">
                    <img src="/images/products/hyalique-x/after-2.jpg" alt="Before Treatment" className="w-full h-64 object-cover" />
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">Before</span>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden">
                  <div className="relative">
                    <img src="/images/products/hyalique-x/before-2.jpg" alt="Before Treatment" className="w-full h-64 object-cover" />
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">After</span>
                  </div>
                </div>
              </FadeIn>
            </div>
            {/* Row 2: Both After images side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden">
                  <div className="relative">
                    <img src="/images/products/hyalique-x/before-1.jpg" alt="After Treatment" className="w-full h-64 object-cover" />
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">Before</span>
                    <span className="absolute top-80 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">After</span>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden">
                  <div className="relative">
                    <img src="/images/products/hyalique-x/after-1.jpg" alt="After Treatment" className="w-full h-64 object-cover" />
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">Before</span>
                     <span className="absolute top-3 left-90 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">After</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

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
                    src="/images/brochures/hyalique-x-brochure.png"
                    alt="Hyalique-X Brochure Preview"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Click to Download</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <a
                  href="/images/brochures/hyalique-x.pdf"
                  download="Hyalique-X-Brochure.pdf"
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
