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

export default function BlueViveSections({ product }: { product: any }) {
  const specs: string[][] = product.specifications || []
  const comp = product.composition || {}
  const ghkcu = product.ghkcuInfo || {}
  const howItWorks: string[] = product.howItWorks || []
  const skinRe = product.skinRemodeling || {}
  const indications: string[] = product.treatmentIndications || []
  const applications: string[] = product.applications || []
  const benefits: string[] = product.benefits || []

  return (
    <div className="text-white">
      {/* ── Product Composition ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Composition</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Product Composition</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/70 mb-2 block">Primary Bioactive</span>
                <h3 className="text-lg font-bold text-white">{comp.primary}</h3>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/70 mb-2 block">Supporting Component</span>
                <h3 className="text-lg font-bold text-white">{comp.supporting}</h3>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-2xl mx-auto">{comp.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Product Specifications ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
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

      {/* ── Key Benefits ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Benefits</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Key Benefits</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {benefits.map((b: string, i: number) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl p-5 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 text-center h-full">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-semibold text-white/80 leading-snug">{b}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Powered by GHK-Cu ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Science</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{ghkcu.title}</h2>
              <p className="text-[14px] text-white/70 font-medium">{ghkcu.subtitle}</p>
              <div className="w-16 h-0.5 bg-white/30 mx-auto mt-4" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-2xl mx-auto mb-10">{ghkcu.description}</p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ghkcu.characteristics?.map((c: string, i: number) => (
              <FadeIn key={i} delay={0.2 + i * 0.08}>
                <div className="rounded-2xl p-5 border border-white/20 bg-white/10 backdrop-blur-md text-center hover:bg-white/15 transition-all duration-300">
                  <p className="text-[12px] font-semibold text-white/80">{c}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How BlueVive Booster Works ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Mechanism</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How BlueVive Booster Works</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          {/* Flowchart */}
          <div className="flex flex-col items-center gap-0">
            {howItWorks.map((step: string, i: number) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center">
                  <div className={`px-8 py-4 rounded-2xl border text-center ${i === 0 ? "border-white/20 bg-white/15" : "border-white/20 bg-white/10 backdrop-blur-md"} hover:bg-white/15 transition-all duration-300`}>
                    <span className={`text-[13px] font-semibold ${i === 0 ? "text-white" : "text-white/80"}`}>{step}</span>
                  </div>
                  {i < howItWorks.length - 1 && (
                    <div className="flex flex-col items-center my-1">
                      <div className="w-px h-6 bg-white/20" />
                      <svg className="w-4 h-4 text-white/30 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skin Remodeling & Structural Support ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Remodeling</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Skin Remodeling & Structural Support</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(skinRe).map(([key, section]: [string, any], i: number) => (
              <FadeIn key={key} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 h-full">
                  <h3 className="text-[14px] font-bold text-white mb-4">{section.title}</h3>
                  <div className="space-y-2.5">
                    {section.points?.map((pt: string, j: number) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[12px] text-white/70 leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Treatment Indications ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Indications</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Treatment Indications</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-3">
            {indications.map((ind: string, i: number) => (
              <FadeIn key={i} delay={i * 0.06}>
                <span className="inline-block px-5 py-2.5 rounded-full text-[12px] font-semibold border border-white/15 bg-white/10 text-white/80 hover:bg-white/20 hover:border-white/25 transition-all duration-300">
                  {ind}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Professional Aesthetic Applications ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 text-white/80 mb-4">Applications</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Professional Aesthetic Applications</h2>
              <div className="w-16 h-0.5 bg-white/30 mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {applications.map((app: string, i: number) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl p-5 border border-white/20 bg-white/10 backdrop-blur-md text-center hover:bg-white/15 transition-all duration-300">
                  <span className="text-[12px] font-semibold text-white/80">{app}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Korean Manufacturing ── */}
      <section className="px-5 sm:px-6 py-12">
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
      <section className="px-5 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md text-center">
              <p className="text-[12px] text-white/60 uppercase tracking-widest font-bold">Professional Aesthetic Use Only</p>
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
                    src="/images/brochures/bluevive-brochure.png"
                    alt="BlueVive Booster Brochure Preview"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Click to Download</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <a
                  href="/images/brochures/bluevivebooster.pdf"
                  download="BlueVive-Booster-Brochure.pdf"
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
