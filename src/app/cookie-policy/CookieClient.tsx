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
    title: "1. What Are Cookies",
    content: `Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

Cookies help us understand how you use our website and improve your browsing experience.`,
  },
  {
    title: "2. Types of Cookies We Use",
    content: `Essential Cookies
These cookies are necessary for the website to function properly. They enable core features such as navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.

Analytics Cookies
We use analytics cookies to understand how visitors interact with our website. These cookies help us measure the number of visitors, bounce rate, traffic source, and other statistical data to improve our website performance.

Preference Cookies
These cookies allow the website to remember choices you make, such as your language preference or region. They provide enhanced, more personal features.

Marketing Cookies
Marketing cookies are used to track visitors across websites to display relevant advertisements. They help us measure the effectiveness of our marketing campaigns.`,
  },
  {
    title: "3. How We Use Cookies",
    content: `EverCeutical uses cookies to:
• Remember your preferences and settings
• Analyze website traffic and usage patterns
• Improve website functionality and user experience
• Provide personalized content and recommendations
• Measure the effectiveness of our content
• Ensure website security and prevent fraud`,
  },
  {
    title: "4. Third-Party Cookies",
    content: `Some cookies are placed by third-party services that appear on our pages. We use third-party services including:
• Google Analytics — for website analytics and performance monitoring
• YouTube — for embedded video content
• Shopify CDN — for product image hosting

These third parties may use cookies according to their own privacy policies.`,
  },
  {
    title: "5. Managing Cookies",
    content: `You can control and manage cookies in several ways:

Browser Settings
Most web browsers allow you to control cookies through their settings. You can set your browser to:
• Block all cookies
• Accept all cookies
• Notify you when a cookie is set
• Delete cookies at the end of each session

Please note that blocking or deleting cookies may affect the functionality of our website.

Opt-Out Links
• Google Analytics: https://tools.google.com/dlpage/gaoptout
• YouTube: https://support.google.com/youtube/answer/1713766`,
  },
  {
    title: "6. Cookies We Use",
    content: `Cookie Name          Purpose                    Duration
─────────────────────────────────────────────────────────
_session             Session management         Session
_cookie_consent      Store cookie preferences   1 year
_ga                  Google Analytics           2 years
_gat                 Google Analytics           1 day
_gid                 Google Analytics           1 day
Pref                 Language preference         1 year`,
  },
  {
    title: "7. Impact of Disabling Cookies",
    content: `If you disable or delete cookies, some features of our website may not function properly, including:
• Form submissions and contact requests
• remembers your preferences
• Analytics and performance monitoring
• Embedded content from third parties

However, you will still be able to browse our website and access general information.`,
  },
  {
    title: "8. Updates to This Policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. Any updates will be posted on this page with an revised effective date.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions about our use of cookies, please contact us:

EverCeutical
Seoul, South Korea
Email: everceutical@gmail.com`,
  },
]

export default function CookieClient() {
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
              Cookie <span className="text-[#0ea5e9]">Policy</span>
            </h1>
            <p className="text-sm text-[#64748b] max-w-lg mx-auto leading-relaxed">
              Last updated: July 2026
            </p>
            <p className="text-sm text-[#64748b] max-w-xl mx-auto leading-relaxed mt-3">
              This Cookie Policy explains how EverCeutical uses cookies and similar technologies when you visit our website.
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
