import { useEffect, useRef, useCallback } from 'react'
import { Rule } from '../types'
import { drawWallpaper, downloadWallpaper } from '../utils/canvas'

interface UseWallpaperCanvasOptions {
  title: string
  rules: Rule[]
  backgroundColor: string
  textColor: string
}

export function useWallpaperCanvas(options: UseWallpaperCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    drawWallpaper(canvas, options)
  }, [options])

  const download = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    downloadWallpaper(canvas, 'myrules-wallpaper.png')
  }, [])

  return { canvasRef, download }
}
