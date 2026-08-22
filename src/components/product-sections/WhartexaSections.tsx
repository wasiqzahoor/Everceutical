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

export default function WhartexaSections({ product }: { product: any }) {
  const accent = product.accentColor || "#5b7c91"
  const specs: string[][] = product.specifications || []
  const highlights: string[] = product.highlights || []
  const qualityPoints: string[] = product.qualityPoints || []
  const storagePoints: string[] = product.storagePoints || []
  const mfg = product.manufacturerInfo || {}

  return (
    <div className="text-white">
      {/* ── Product Highlights ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 text-white mb-4">Overview</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Product Highlights</h2>
              <div className="w-16 h-0.5 bg-white/40 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {highlights.map((h: string, i: number) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="relative rounded-2xl p-5 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-center group">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[12px] font-semibold text-white leading-snug">{h}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Specifications Table ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 text-white mb-4">Technical</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Product Specifications</h2>
              <div className="w-16 h-0.5 bg-white/40 mx-auto" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/20 overflow-hidden backdrop-blur-md">
              <table className="w-full text-left">
                <tbody>
                  {specs.map((row: string[], i: number) => (
                    <tr key={i} className={`border-b border-white/10 ${i % 2 === 0 ? "bg-white/10" : "bg-white/5"} hover:bg-white/15 transition-colors`}>
                      <td className="px-6 py-4 text-[13px] font-semibold text-white/80 w-[40%]">{row[0]}</td>
                      <td className="px-6 py-4 text-[13px] text-white">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Source & Technology ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 text-white mb-4">Science</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Source & Technology</h2>
              <div className="w-16 h-0.5 bg-white/40 mx-auto" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur-md">
              <p className="text-[15px] leading-relaxed text-white">{product.sourceAndTech}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quality & Characterization ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 text-white mb-4">Quality</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quality & Characterization</h2>
              <div className="w-16 h-0.5 bg-white/40 mx-auto" />
              <p className="mt-4 text-[14px] text-white/80 max-w-lg mx-auto">The Whartexa&trade; platform focuses on controlled processing and quality-oriented characterization, including evaluation of:</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {qualityPoints.map((q: string, i: number) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-3 rounded-2xl p-5 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-white">{q}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Storage & Handling ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 text-white mb-4">Handling</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Storage & Handling</h2>
              <div className="w-16 h-0.5 bg-white/40 mx-auto" />
            </div>
          </FadeIn>

          <div className="space-y-3">
            {storagePoints.map((s: string, i: number) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl p-5 border border-white/20 bg-white/10 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[12px] font-bold text-white">{i + 1}</span>
                  </div>
                  <p className="text-[14px] text-white leading-relaxed">{s}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-8 p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md text-center">
              <span className="text-[13px] text-white/80">Storage Temperature: </span>
              <span className="text-[15px] font-bold text-white">&minus;20&deg;C</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Manufacturer ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 text-white mb-4">Manufacturing</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Manufacturer</h2>
              <div className="w-16 h-0.5 bg-white/40 mx-auto" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <a href="https://www.nanoventra.com/" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur-md text-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-bold text-white mb-2">{mfg.name}</h3>
              <p className="text-[13px] text-white/80 mb-4">{mfg.tagline}</p>
              <div className="w-12 h-px bg-white/30 mx-auto mb-4" />
              <p className="text-[13px] text-white leading-relaxed">{mfg.address}</p>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Intended Use ── */}
      <section className="px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md text-center">
              <p className="text-[12px] text-white/80 uppercase tracking-widest font-bold mb-2">Professional Research & Biotechnology Applications Only</p>
            </div>
          </FadeIn>
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
                    src={product.id === "whartexa-20b" ? "/images/brochures/whartexa-20b-brochure.png" : "/images/brochures/whartexa-60b-brochure.png"}
                    alt="Whartexa Brochure Preview"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Click to Download</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <a
                  href="/images/brochures/whartexa20b60b.pdf"
                  download="Whartexa-Brochure.pdf"
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
