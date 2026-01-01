export interface Rule {
  id: string
  text: string
}

export type WritingMode = 'horizontal' | 'vertical'

export const JAPANESE_NUMERALS = ['一', '二', '三', '四', '五']

export interface WallpaperConfig {
  title: string
  rules: Rule[]
  backgroundColor: string
  textColor: string
}

export const WALLPAPER_WIDTH = 1290
export const WALLPAPER_HEIGHT = 2796
export const ASPECT_RATIO = WALLPAPER_WIDTH / WALLPAPER_HEIGHT

export const PRESET_COLORS = [
  { name: 'Black', bg: '#000000', text: '#ffffff' },
  { name: 'White', bg: '#ffffff', text: '#000000' },
  { name: 'Navy', bg: '#1e3a5f', text: '#ffffff' },
  { name: 'Dark Gray', bg: '#2d2d2d', text: '#ffffff' },
  { name: 'Forest', bg: '#1a3c34', text: '#ffffff' },
  { name: 'Wine', bg: '#4a1c2e', text: '#ffffff' },
  { name: 'Slate', bg: '#475569', text: '#ffffff' },
  { name: 'Cream', bg: '#f5f5dc', text: '#333333' },
]

export const DEFAULT_RULES: Rule[] = [
  { id: '1', text: 'Wake up early and start with intention' },
  { id: '2', text: 'Exercise for at least 30 minutes' },
  { id: '3', text: 'Read something meaningful every day' },
  { id: '4', text: 'No phone for the first hour' },
  { id: '5', text: 'Focus on what matters most' },
]
