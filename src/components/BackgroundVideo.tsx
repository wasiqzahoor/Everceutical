"use client"

import { useEffect, useRef, useState } from "react"
import { useLoading } from "./LoadingContext"

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { setVideoReady } = useLoading()
  const readyFiredRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (mobile) {
      setLoaded(true)
      setVideoReady(true)
    }
  }, [setVideoReady])

  useEffect(() => {
    if (isMobile) return

    const v = videoRef.current
    if (!v) return

    const markReady = () => {
      if (readyFiredRef.current) return
      readyFiredRef.current = true
      setLoaded(true)
      setVideoReady(true)
    }

    const playVideo = () => {
      v.play().catch(() => {
        setTimeout(playVideo, 2000)
      })
    }

    const onCanPlay = () => {
      markReady()
      playVideo()
    }

    const onError = () => {
      setLoaded(true)
      markReady()
    }

    v.addEventListener("canplaythrough", onCanPlay)
    v.addEventListener("error", onError)

    v.load()

    const fallback = setTimeout(() => {
      markReady()
    }, 5000)

    return () => {
      v.removeEventListener("canplaythrough", onCanPlay)
      v.removeEventListener("error", onError)
      clearTimeout(fallback)
    }
  }, [isMobile, setVideoReady])

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          zIndex: 0,
          pointerEvents: "none",
          background: "linear-gradient(135deg, #0c1a2e 0%, #0f2847 40%, #0a1628 100%)",
        }}
      />
    )
  }

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(135deg, #0c1a2e 0%, #0f2847 40%, #0a1628 100%)",
      }}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: loaded ? 0.85 : 0.4,
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <source src="/videos/website-bg.webm" type="video/webm" />
        <source src="/videos/website-bg.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.1) 100%)",
        }}
      />
    </div>
  )
}
