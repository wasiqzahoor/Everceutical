"use client"

import { useState, useEffect, useRef } from "react"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const categories = ["All", "Brochures", "Clinical Guides", "Research"]

const brochures = [
  {
    title: "ExoGenesis Scalp Treatment Brochure",
    description: "Complete product guide for ExoGenesis scalp exosome treatments with clinical protocols.",
    category: "Brochures",
    type: "PDF",
    pages: "12 Pages",
    image: "/images/brochures/ExoGenesis-Scalp-Brochure.PNG",
    pdf: "/pdfs/ExoGenesis-Scalp-Brochure.pdf",
    downloadName: "ExoGenesis-Scalp-Brochure.pdf",
  },
  {
    title: "ExoGenesis Vital Kit Brochure",
    description: "Premium anti-aging and skin rejuvenation therapy guide with 10 Billion exosome protocols.",
    category: "Brochures",
    type: "PDF",
    pages: "10 Pages",
    image: "/images/brochures/ExoGenesis-Vital-Kit-10B.PNG",
    pdf: "/pdfs/ExoGenesis-Vital-Kit-10B.pdf",
    downloadName: "ExoGenesis-Vital-Kit-10B.pdf",
  },
  {
    title: "ExoGenesis Research Paper",
    description: "Scientific documentation covering exosome biology, purification methods, and clinical applications.",
    category: "Research",
    type: "PDF",
    pages: "17 Pages",
    image: "/images/brochures/ExoGenesis-Research-Paper.PNG",
    pdf: "/pdfs/ExoGenesis-Research-Paper.pdf",
    downloadName: "ExoGenesis-Research-Paper.pdf",
  },
  {
    title: "ExoGenesis Inspection Report",
    description: "Official quality inspection report verifying product standards and safety compliance.",
    category: "Research",
    type: "PDF",
    pages: "4 Pages",
    image: "/images/brochures/ExoGenesis-Inspection-Report.PNG",
    pdf: "/pdfs/ExoGenesis-Inspection-Report.pdf",
    downloadName: "ExoGenesis-Inspection-Report.pdf",
  },
  {
    title: "ExoGenesis Safety Data Sheet",
    description: "Material safety data sheet with handling, storage, and transportation guidelines.",
    category: "Clinical Guides",
    type: "PDF",
    pages: "6 Pages",
    image: "/images/brochures/ExoGenesis-Safety-Data-Sheet.PNG",
    pdf: "/pdfs/ExoGenesis-Safety-Data-Sheet.pdf",
    downloadName: "ExoGenesis-Safety-Data-Sheet.pdf",
  },
  {
    title: "Whartexa Clinical Application Guide",
    description: "High-concentration exosome therapy protocols, dosage guidelines, and clinical outcomes.",
    category: "Clinical Guides",
    type: "PDF",
    pages: "8 Pages",
    image: "/images/brochures/Whartexa Clinical Application Guide.PNG",
    pdf: "/pdfs/Whartexa-Brochure.pdf",
    downloadName: "Whartexa-Brochure.pdf",
  },
  {
    title: "Whartexa Inspection Report",
    description: "Official quality inspection report for Whartexa exosome products.",
    category: "Research",
    type: "PDF",
    pages: "5 Pages",
    image: "/images/brochures/Whartexa-Inspection-Report.PNG",
    pdf: "/pdfs/Whartexa-Inspection-Report.pdf",
    downloadName: "Whartexa-Inspection-Report.pdf",
  },
  {
    title: "Whartexa CRYO-TEM Report",
    description: "Vesicle morphology analysis using Cryogenic Transmission Electron Microscopy.",
    category: "Research",
    type: "PDF",
    pages: "8 Pages",
    image: "/images/brochures/Whartexa-CRYO-TEM-Report.PNG",
    pdf: "/pdfs/Whartexa-CRYO-TEM-Report.pdf",
    downloadName: "Whartexa-CRYO-TEM-Report.pdf",
  },
  {
    title: "Whartexa Material Safety Data Sheet",
    description: "Material safety data sheet for Whartexa exosome products.",
    category: "Clinical Guides",
    type: "PDF",
    pages: "6 Pages",
    image: "/images/brochures/Whartexa-MSDS.PNG",
    pdf: "/pdfs/Whartexa-MSDS.pdf",
    downloadName: "Whartexa-MSDS.pdf",
  },
  {
    title: "Hyalique-X Dermal Filler Catalog",
    description: "Full range of hyaluronic acid fillers, boosters, and skin rejuvenation systems.",
    category: "Brochures",
    type: "PDF",
    pages: "10 Pages",
    image: "/images/brochures/Hyalique-X Dermal Filler Catalog.PNG",
    pdf: "/pdfs/Hyalique-X-Brochure.pdf",
    downloadName: "Hyalique-X-Brochure.pdf",
  },
]

function handleDownload(pdf: string, downloadName: string) {
  const a = document.createElement("a")
  a.href = pdf
  a.download = downloadName
  a.style.display = "none"
  document.body.appendChild(a)
  a.click()
  setTimeout(() => document.body.removeChild(a), 200)
}

export default function BrochureSection() {
  const header = useInView(0.1)
  const list = useInView(0.1)
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? brochures
    : brochures.filter(b => b.category === activeCategory)

  return (
    <section className="relative bg-transparent py-10 md:py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-[#0ea5e9]/[0.02] blur-3xl" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 z-10 relative">
        {/* Header */}
        <div
          ref={header.ref}
          className="text-center mb-8"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full inline-block mb-4">
            Resources
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3">
            Educational <span className="text-[#0ea5e9]">Content</span>
          </h2>
          <p className="text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
            Access our comprehensive library of product brochures, clinical guides, and research documentation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          ref={list.ref}
          className="flex flex-wrap justify-center gap-2 mb-8"
          style={{
            opacity: list.visible ? 1 : 0,
            transform: list.visible ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#0ea5e9] text-white shadow-md shadow-[#0ea5e9]/25"
                  : "bg-white text-[#64748b] border border-[#e2e8f0] hover:border-[#0ea5e9]/30 hover:text-[#0ea5e9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-[11px] text-[#94a3b8]">
            Showing {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((brochure, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10"
              style={{
                opacity: list.visible ? 1 : 0,
                transform: list.visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.08}s`,
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-[#f8fafc] border-b border-[#e2e8f0]">
                <img
                  src={brochure.image}
                  alt={brochure.title}
                  className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase backdrop-blur-md bg-white/90 text-[#0ea5e9]">
                    {brochure.type}
                  </span>
                </div>
                {/* Pages Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase backdrop-blur-md bg-black/40 text-white">
                    {brochure.pages}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category */}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#0ea5e9]/10 text-[#0ea5e9] mb-3">
                  {brochure.category}
                </span>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-[#0f172a] mb-2 leading-snug group-hover:text-[#0ea5e9] transition-colors duration-300">
                  {brochure.title}
                </h3>

                {/* Description */}
                <p className="text-[12px] text-[#64748b] leading-relaxed mb-4 line-clamp-2">
                  {brochure.description}
                </p>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(brochure.pdf, brochure.downloadName)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] text-[12px] font-semibold hover:bg-[#0ea5e9] hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-12 glass-card rounded-2xl">
            <svg className="w-12 h-12 mx-auto text-[#94a3b8] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-sm text-[#94a3b8]">No resources found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}




