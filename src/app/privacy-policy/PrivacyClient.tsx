"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function useInView(threshold = 0.1) {
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

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, including:
• Name, email address, and contact information when you fill out our contact or inquiry forms
• Professional credentials and clinic information when requesting product consultations
• Communication preferences and marketing interests
• Any other information you voluntarily provide through our website`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:
• Respond to your inquiries and provide requested product information
• Send clinical protocols, research materials, and product documentation
• Process and fulfill product orders and partnership requests
• Improve our website, products, and services
• Comply with legal obligations and regulatory requirements
• Send relevant updates about our exosome technology and formulations (with your consent)`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only:
• With Vesco Science Co., Ltd. for product fulfillment and manufacturing coordination
• With authorized distributors and clinical partners as needed for service delivery
• When required by law, regulation, or legal process
• To protect the rights, property, or safety of EverCeutical, our users, or the public`,
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security practices include:
• Encrypted data transmission (SSL/TLS)
• Secure server infrastructure
• Access controls and authentication protocols
• Regular security assessments and updates`,
  },
  {
    title: "5. Cookies and Tracking",
    content: `Our website uses cookies and similar technologies to:
• Analyze website traffic and usage patterns
• Remember your preferences and settings
• Provide personalized content and recommendations
• Improve user experience and website performance

You can control cookie settings through your browser preferences. For more details, please refer to our Cookie Policy.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to:
• Access the personal information we hold about you
• Request correction of inaccurate or incomplete data
• Request deletion of your personal information
• Opt out of marketing communications at any time
• Withdraw consent for data processing where applicable

To exercise these rights, please contact us at everceutical@gmail.com`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. When your information is no longer needed, we will securely delete or anonymize it.`,
  },
  {
    title: "8. International Transfers",
    content: `As a Korea-based company serving international clients, your information may be transferred to and processed in South Korea or other countries where our partners operate. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our website and services are intended for healthcare professionals and are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: "11. Contact Us",
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

EverCeutical
Seoul, South Korea
Email: everceutical@gmail.com`,
  },
]

export default function PrivacyClient() {
  const hero = useInView(0.1)

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div
            ref={hero.ref}
            className="text-center mb-12"
            style={{
              opacity: hero.visible ? 1 : 0,
              transform: hero.visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span className="text-[10px] text-[#38bdf8] font-bold tracking-[0.25em] uppercase bg-[#0ea5e9]/[0.08] px-4 py-1.5 rounded-full inline-block mb-5">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] mb-4">
              Privacy <span className="text-[#0ea5e9]">Policy</span>
            </h1>
            <p className="text-sm text-[#64748b] max-w-lg mx-auto leading-relaxed">
              Last updated: July 2026
            </p>
            <p className="text-sm text-[#64748b] max-w-xl mx-auto leading-relaxed mt-3">
              At EverCeutical, we are committed to protecting your privacy and ensuring the security of your personal information. This policy describes how we collect, use, and safeguard your data.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 sm:p-8"
                style={{
                  opacity: hero.visible ? 1 : 0,
                  transform: hero.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.05}s`,
                }}
              >
                <h2 className="text-lg font-bold text-[#0f172a] mb-3">{section.title}</h2>
                <div className="text-sm text-[#334155] leading-[1.8] whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#0ea5e9] font-semibold hover:underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
