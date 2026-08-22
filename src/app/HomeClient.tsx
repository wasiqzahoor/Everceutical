"use client"

import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"

const WhatAreExosomesSection = dynamic(() => import("@/components/WhatAreExosomesSection"), { ssr: false })
const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"), { ssr: false })
const CategoryPreview = dynamic(() => import("@/components/CategoryPreview"), { ssr: false })
const ExosomeClassesSection = dynamic(() => import("@/components/ExosomeClassesSection"), { ssr: false })
const BenefitsSection = dynamic(() => import("@/components/BenefitsSection"), { ssr: false })
const BrochureSection = dynamic(() => import("@/components/BrochureSection"), { ssr: false })
const FAQSection = dynamic(() => import("@/components/FAQSection"), { ssr: false })
const BehindTheScienceSection = dynamic(() => import("@/components/BehindTheScienceSection"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })

export default function HomeClient() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div className="h-2 md:h-4" />
        <WhatAreExosomesSection />
        <div className="h-3 md:h-5" />
        <FeaturedProducts />
        <div className="h-3 md:h-5" />
        <CategoryPreview />
        <div className="h-2 md:h-4" />
        <ExosomeClassesSection />
        <div className="h-2 md:h-4" />
        <BenefitsSection />
        <div className="h-2 md:h-4" />
        <BrochureSection />
        <div className="h-2 md:h-4" />
        <FAQSection />
        <div className="h-2 md:h-4" />
        <BehindTheScienceSection />
        <Footer />
      </main>
    </>
  )
}
