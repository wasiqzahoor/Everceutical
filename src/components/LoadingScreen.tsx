"use client"

import { useState, useEffect, useRef } from "react"
import { useLoading } from "./LoadingContext"

export default function LoadingScreen() {
  const { allReady } = useLoading()
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const progressRef = useRef(0)
  const [progressDisplay, setProgressDisplay] = useState(0)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef(0)

  useEffect(() => {
    setMounted(true)
    startTimeRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (!mounted) return

    function tick() {
      const elapsed = Date.now() - startTimeRef.current
      let target: number

      if (allReady) {
        target = 100
      } else {
        const t = Math.min(elapsed / 1500, 1)
        target = 100 * (1 - Math.pow(1 - t, 4))
        target = Math.min(target, 98)
      }

      progressRef.current += (target - progressRef.current) * 0.1
      setProgressDisplay(Math.round(progressRef.current * 10) / 10)

      if (progressRef.current < 99.5) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mounted, allReady])

  useEffect(() => {
    if (allReady && mounted) {
      progressRef.current = 100
      setProgressDisplay(100)
      const fadeTimer = setTimeout(() => setFading(true), 200)
      const hideTimer = setTimeout(() => {
        setVisible(false)
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
        document.body.style.top = ""
      }, 600)
      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [allReady, mounted])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #f0fdfa 70%, #f8fafc 100%)",
        transition: "opacity 0.5s ease-out",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {/* Subtle background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
            top: "20%",
            left: "10%",
            animation: "floatOrb 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
            bottom: "15%",
            right: "15%",
            animation: "floatOrb 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-5 relative z-10">
        {/* Logo with soft glow */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
              transform: "scale(2.5)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          />
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <img
              src="/images/logo.png?v=6"
              alt="EverCeutical"
              className="w-full h-full object-contain drop-shadow-sm"
              style={{
                animation: mounted ? "logoReveal 0.8s ease-out forwards" : "none",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.8)",
              }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div
          style={{
            animation: mounted ? "fadeUp 0.6s ease-out 0.3s forwards" : "none",
            opacity: 0,
            transform: "translateY(8px)",
          }}
        >
          <h1 className="text-lg md:text-xl font-bold tracking-tight">
            <span className="text-[#0f172a]">Ever</span>
            <span className="text-[#0ea5e9]">Ceutical</span>
          </h1>
        </div>

        {/* Elegant progress bar */}
        <div
          className="w-28 md:w-36"
          style={{
            animation: mounted ? "fadeUp 0.6s ease-out 0.5s forwards" : "none",
            opacity: 0,
            transform: "translateY(8px)",
          }}
        >
          <div className="h-[3px] bg-[#e2e8f0]/60 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressDisplay}%`,
                background: "linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc)",
                transition: "width 0.15s ease-out",
                boxShadow: "0 0 8px rgba(14,165,233,0.3)",
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] text-[#94a3b8] font-medium">
              {progressDisplay < 99 ? "Loading..." : "Ready"}
            </span>
            <span className="text-[9px] text-[#94a3b8] font-medium">
              {Math.round(progressDisplay)}%
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(2.5); }
          50% { opacity: 1; transform: scale(2.8); }
        }
        @keyframes logoReveal {
          from { opacity: 0; transform: scale(0.8); filter: blur(4px); }
          to { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
