"use client"

import dynamic from "next/dynamic"

const PostProcessingDesktop = dynamic(
  () => import("./PostProcessingDesktop").then((m) => m.default),
  { ssr: false, loading: () => null }
)

const PostProcessingMobile = dynamic(
  () => import("./PostProcessingMobile").then((m) => m.default),
  { ssr: false, loading: () => null }
)

export function PostProcessing({ isMobile }: { isMobile: boolean }) {
  if (isMobile) return <PostProcessingMobile />
  return <PostProcessingDesktop />
}
