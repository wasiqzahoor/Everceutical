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
    title: "1. Acceptance of Terms",
    content: `By accessing and using the EverCeutical website (everceutical.com), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.

These terms apply to all visitors, users, and customers who access or use our website and services.`,
  },
  {
    title: "2. Products and Services",
    content: `EverCeutical provides information about exosome-based biotechnology products for regenerative medicine and aesthetic dermatology. Our products include:

• ExoGenesis Series — hUC-MSCs-derived exosome formulations
• Whartexa Series — High-concentration exosome therapies
• Hyalique-X Series — Hyaluronic acid dermal fillers

All products are intended for use by qualified healthcare professionals only. Product information provided on this website is for educational and professional reference purposes.`,
  },
  {
    title: "3. Professional Use Only",
    content: `Our products are designed for professional clinical use by trained and certified healthcare practitioners. By purchasing or inquiring about our products, you confirm that:

• You are a licensed healthcare professional
• You have the appropriate training to administer exosome-based treatments
• You will comply with all applicable local regulations and guidelines
• You will use products only within your scope of practice`,
  },
  {
    title: "4. Product Information and Accuracy",
    content: `We strive to provide accurate and up-to-date information about our products, including specifications, clinical data, and treatment protocols. However:

• Product details may be updated without prior notice
• Clinical results may vary depending on individual patient factors
• Images and descriptions are for illustrative purposes only
• Always refer to the official product documentation for the most current information`,
  },
  {
    title: "5. Orders and Purchases",
    content: `Product orders are subject to:
• Verification of professional credentials
• Availability and inventory status
• Compliance with export/import regulations
• Payment of applicable fees and shipping costs

EverCeutical reserves the right to refuse or cancel orders that do not meet our professional verification requirements.`,
  },
  {
    title: "6. Intellectual Property",
    content: `All content on this website, including text, graphics, logos, images, product descriptions, and research materials, is the property of EverCeutical or its licensors and is protected by intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from any content without prior written permission from EverCeutical.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `EverCeutical shall not be liable for any indirect, incidental, special, or consequential damages arising from:
• Use of or inability to use our website
• Reliance on information provided on this website
• Product use outside recommended protocols
• Any unauthorized access to or alteration of your data

Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim.`,
  },
  {
    title: "8. Indemnification",
    content: `You agree to indemnify and hold harmless EverCeutical, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, costs, and expenses (including legal fees) arising from:
• Your use of our website or services
• Your violation of these Terms
• Your violation of any applicable laws or regulations
• Any third-party claims related to your use of our products`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Seoul, South Korea.`,
  },
  {
    title: "10. Changes to Terms",
    content: `EverCeutical reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this website. Your continued use of the website after any changes constitutes acceptance of the new terms.`,
  },
  {
    title: "11. Contact Information",
    content: `For questions about these Terms and Conditions, please contact:

EverCeutical
Seoul, South Korea
Email: everceutical@gmail.com`,
  },
]

export default function TermsClient() {
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
              Terms & <span className="text-[#0ea5e9]">Conditions</span>
            </h1>
            <p className="text-sm text-[#64748b] max-w-lg mx-auto leading-relaxed">
              Last updated: July 2026
            </p>
            <p className="text-sm text-[#64748b] max-w-xl mx-auto leading-relaxed mt-3">
              Please read these Terms and Conditions carefully before using our website or purchasing our products. These terms govern your use of EverCeutical services.
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
