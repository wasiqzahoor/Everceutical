import productsJson from "./products.json"
import productCustomData from "./productCustomData.json"
import siteContentJson from "./site-content.json"

// ─── TYPES ───────────────────────────────────────────────────────────
export type ProductCategory = "EXOGENESIS" | "WHARTEXA" | "HYALIQUE-X" | "BLUEVIVE"

export interface CaseStudy {
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

export interface ProductData {
  id: string
  title: string
  subtitle: string
  desc: string
  href: string
  img: string
  images?: string[]
  fullName: string
  category: ProductCategory
  size: string
  kitContent: string[]
  peptides: { name: string; function: string }[]
  benefits: string[]
  idealFor: string[]
  howToUse: string[]
  importantNote: string
  usage: string
  price?: string
  bgColor: string
  accentColor: string
  featured?: boolean
  caseStudies: CaseStudy[]
  comingSoon?: boolean
  pageType?: string
  specifications?: string[][]
  highlights?: string[]
  sourceAndTech?: string
  qualityPoints?: string[]
  storagePoints?: string[]
  manufacturerInfo?: { name: string; address: string; tagline: string }
  productRange?: { variant: string; volume: string; concentration: string; type: string; application: string }[]
  molecularTech?: { small: { title: string; description: string; idealFor: string[] }; large: { title: string; description: string; idealFor: string[] } }
  keyBenefits?: { title: string; desc: string }[]
  composition?: { title: string; primary: string; supporting: string; description: string }
  ghkcuInfo?: { title: string; subtitle: string; description: string; characteristics: string[] }
  howItWorks?: string[]
  skinRemodeling?: any
  treatmentIndications?: string[]
  applications?: string[]
}

export interface BenefitDetail {
  title: string
  shortDesc: string
  fullDesc: string
  image: string
  category: "regenerative" | "aesthetic"
  color: string
}

export interface ExosomeClass {
  name: string
  tagline: string
  icon: string
  color: string
}

export interface FaqItem {
  q: string
  a: string
}

// ─── DATA (imported from JSON) ───────────────────────────────────────

export const products: ProductData[] = (productsJson as any[]).map((p: any) => {
  const custom = (productCustomData as any)[p.id]
  return custom ? { ...p, ...custom } : p
}) as ProductData[]

export const navLinks = siteContentJson.navLinks as { label: string; href: string }[]

export const productCategories = siteContentJson.productCategories as { name: string; value: string }[]

export const benefits = siteContentJson.benefits as { title: string; desc: string }[]

export const benefitDetails: BenefitDetail[] = siteContentJson.benefitDetails as BenefitDetail[]

export const faq: FaqItem[] = siteContentJson.faq as FaqItem[]

export const exosomeTechnology = siteContentJson.exosomeTechnology as typeof siteContentJson.exosomeTechnology

export const inspectionReport = siteContentJson.inspectionReport as typeof siteContentJson.inspectionReport

export const exosomeClasses: ExosomeClass[] = [
  {
    name: "hUC-MSC Exosomes",
    tagline: "Umbilical Cord-Derived",
    icon: "https://huggingface.co/spaces/bilal23bhai/EVERCEUTICALS/resolve/main/images/class-huc-msc.png",
    color: "#0ea5e9",
  },
  {
    name: "Fibroblast Exosomes",
    tagline: "Skin Cell-Derived",
    icon: "https://huggingface.co/spaces/bilal23bhai/EVERCEUTICALS/resolve/main/images/class-fibroblast.png",
    color: "#38bdf8",
  },
  {
    name: "Adipose Exosomes",
    tagline: "Fat Tissue-Derived",
    icon: "https://huggingface.co/spaces/bilal23bhai/EVERCEUTICALS/resolve/main/images/class-adipose.png",
    color: "#0284c7",
  },
  {
    name: "LECO Exosomes",
    tagline: "Lab-Engineered",
    icon: "https://huggingface.co/spaces/bilal23bhai/EVERCEUTICALS/resolve/main/images/class-leco.png",
    color: "#0369a1",
  },
  {
    name: "Plant Exosomes",
    tagline: "Botanical-Derived",
    icon: "https://huggingface.co/spaces/bilal23bhai/EVERCEUTICALS/resolve/main/images/class-plant.png",
    color: "#0ea5e9",
  },
]

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────

export const getProductsByCategory = (category: string) => {
  if (category === "all") return products
  return products.filter((p) => p.category === category)
}

export const getFeaturedProducts = () => {
  return products.filter((p) => p.featured)
}
