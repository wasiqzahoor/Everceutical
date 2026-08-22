"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

interface LoadingState {
  contentReady: boolean
  setContentReady: (v: boolean) => void
  sceneReady: boolean
  setSceneReady: (v: boolean) => void
  videoReady: boolean
  setVideoReady: (v: boolean) => void
  allReady: boolean
}

const LoadingContext = createContext<LoadingState>({
  contentReady: false,
  setContentReady: () => {},
  sceneReady: false,
  setSceneReady: () => {},
  videoReady: false,
  setVideoReady: () => {},
  allReady: false,
})

export function useLoading() {
  return useContext(LoadingContext)
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [contentReady, setContentReady] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const handleSetContentReady = useCallback((v: boolean) => setContentReady(v), [])
  const handleSetSceneReady = useCallback((v: boolean) => setSceneReady(v), [])
  const handleSetVideoReady = useCallback((v: boolean) => setVideoReady(v), [])

  useEffect(() => {
    // 1. DOM ready
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setContentReady(true)
    } else {
      const onDOM = () => setContentReady(true)
      document.addEventListener("DOMContentLoaded", onDOM)
      return () => document.removeEventListener("DOMContentLoaded", onDOM)
    }

    // 2. window.load — all resources loaded
    const onLoad = () => setSceneReady(true)

    if (document.readyState === "complete") {
      setSceneReady(true)
    } else {
      window.addEventListener("load", onLoad)
      return () => window.removeEventListener("load", onLoad)
    }

    // 3. Preload critical images in background
    const criticalImages = [
      "/images/logo.png",
      "/images/navbar-logo.png",
      "/images/hero-bg.jpg",
    ]
    let loaded = 0
    criticalImages.forEach((src) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        loaded++
        if (loaded >= criticalImages.length) {
          setVideoReady(true)
        }
      }
      img.src = src
    })
  }, [])

  // MAX 5 second timeout — faster loading experience
  useEffect(() => {
    const forceReady = setTimeout(() => {
      setContentReady(true)
      setSceneReady(true)
      setVideoReady(true)
    }, 5000)
    return () => clearTimeout(forceReady)
  }, [])

  const allReady = contentReady && sceneReady && videoReady

  return (
    <LoadingContext.Provider
      value={{
        contentReady,
        setContentReady: handleSetContentReady,
        sceneReady,
        setSceneReady: handleSetSceneReady,
        videoReady,
        setVideoReady: handleSetVideoReady,
        allReady,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}
