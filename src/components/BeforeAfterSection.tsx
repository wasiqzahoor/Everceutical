"use client"

import { useState } from "react"

interface CaseStudy {
  name: string
  age: number
  gender: string
  concern: string
  treatment: string
  sessions: string
  results: string
  feedback: string
  beforeImage: string
  afterImage: string
}

interface BeforeAfterSectionProps {
  caseStudies: CaseStudy[]
  accent?: string
}

export default function BeforeAfterSection({ caseStudies, accent = "#0ea5e9" }: BeforeAfterSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <div className="space-y-6">
      {caseStudies.map((study, i) => {
        const isExpanded = expandedIndex === i
        const isComposite = study.beforeImage === study.afterImage

        return (
          <div
            key={i}
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            }}
          >
            {/* Image */}
            <div className="relative">
              <img
                src={study.beforeImage}
                alt={`${study.name} - Before & After`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Labels */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-bold tracking-wider uppercase">
                  Before
                </span>
              </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/80 backdrop-blur-sm text-[#0f172a] text-[8px] sm:text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  After
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 sm:p-5">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div>
                  <h4 className="text-[13px] sm:text-[15px] font-bold text-[#0f172a]">{study.name}</h4>
                  <p className="text-[10px] sm:text-[11px] text-[#64748b]">
                    {study.age} years old · {study.gender}
                  </p>
                </div>
                <span
                  className="text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 sm:px-3 py-1 rounded-full"
                  style={{ backgroundColor: accent + "15", color: accent }}
                >
                  {study.sessions}
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Concern</span>
                  <p className="text-[12px] sm:text-[13px] text-[#334155]">{study.concern}</p>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Results</span>
                  <p className="text-[12px] sm:text-[13px] text-[#334155]">{study.results}</p>
                </div>
              </div>

              {/* Expand/Collapse Feedback */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="text-[11px] sm:text-[12px] font-semibold transition-colors duration-300 flex items-center gap-1"
                style={{ color: accent }}
              >
                {isExpanded ? "Hide Feedback" : "Read Feedback"}
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                style={{
                  maxHeight: isExpanded ? "200px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                }}
              >
                <div className="pt-3 border-t border-[#e2e8f0] mt-3">
                  <p className="text-[12px] sm:text-[13px] text-[#334155] italic leading-relaxed">
                    &ldquo;{study.feedback}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
