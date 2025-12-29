import { useState, useMemo, useEffect } from 'react'
import { Rule, DEFAULT_RULES, PRESET_COLORS } from './types'
import { useWallpaperCanvas } from './hooks/useWallpaperCanvas'
import { TitlePosition } from './utils/canvas'
import { RulesList } from './components/RulesList'
import { ColorPicker } from './components/ColorPicker'
import { Preview } from './components/Preview'
import { ExportButton } from './components/ExportButton'
import { TitleEditor } from './components/TitleEditor'
import { ImageUploader, StoredImage } from './components/ImageUploader'
import { PositionSelector } from './components/PositionSelector'

const STORAGE_KEY = 'myrules-saved-data'

interface SavedData {
  title: string
  rules: Rule[]
  titlePosition: TitlePosition
  backgroundColor: string
  textColor: string
}

function loadSavedData(): SavedData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load saved data:', e)
  }
  return null
}

function App() {
  const savedData = loadSavedData()

  const [title, setTitle] = useState(savedData?.title ?? 'My Rules')
  const [rules, setRules] = useState<Rule[]>(savedData?.rules ?? DEFAULT_RULES)
  const [backgroundColor, setBackgroundColor] = useState(savedData?.backgroundColor ?? PRESET_COLORS[0].bg)
  const [textColor, setTextColor] = useState(savedData?.textColor ?? PRESET_COLORS[0].text)
  const [storedImages, setStoredImages] = useState<StoredImage[]>([])
  const [currentImageId, setCurrentImageId] = useState<string | null>(null)
  const [titlePosition, setTitlePosition] = useState<TitlePosition>(savedData?.titlePosition ?? 'high')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null)

  // Get current background image element
  const backgroundImage = useMemo(() => {
    if (!currentImageId) return null
    return storedImages.find((img) => img.id === currentImageId)?.element ?? null
  }, [currentImageId, storedImages])

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSaveStatus('saving')
      try {
        const dataToSave: SavedData = {
          title,
          rules,
          titlePosition,
          backgroundColor,
          textColor,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus(null), 2000)
      } catch (e) {
        console.error('Failed to save:', e)
        setSaveStatus(null)
      }
    }, 500) // Debounce saves by 500ms

    return () => clearTimeout(timeoutId)
  }, [title, rules, titlePosition, backgroundColor, textColor])

  // Load default background images on mount
  useEffect(() => {
    const defaultImages = [
      { id: 'default1', src: '/iphone_sample.png' },
      { id: 'default2', src: '/iphone_sample2.png' },
      { id: 'default3', src: '/iphone_sample3.png' },
    ]

    const loadedImages: StoredImage[] = []
    let loadedCount = 0

    defaultImages.forEach(({ id, src }) => {
      const img = new Image()
      img.onload = () => {
        loadedImages.push({ id, dataUrl: src, element: img })
        loadedCount++
        if (loadedCount === defaultImages.length) {
          // Sort to maintain order
          loadedImages.sort((a, b) => a.id.localeCompare(b.id))
          setStoredImages(loadedImages)
          setCurrentImageId('default1')
        }
      }
      img.src = src
    })
  }, [])

  const canvasOptions = useMemo(
    () => ({ title, rules, backgroundColor, textColor, backgroundImage, titlePosition }),
    [title, rules, backgroundColor, textColor, backgroundImage, titlePosition]
  )

  const { canvasRef, download } = useWallpaperCanvas(canvasOptions)

  const handleAddRule = () => {
    if (rules.length >= 10) return
    const newRule: Rule = {
      id: Date.now().toString(),
      text: '',
    }
    setRules([...rules, newRule])
  }

  const handleUpdateRule = (id: string, text: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, text } : r)))
  }

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id))
  }

  const handleMoveUp = (id: string) => {
    const index = rules.findIndex((r) => r.id === id)
    if (index <= 0) return
    const newRules = [...rules]
    ;[newRules[index - 1], newRules[index]] = [newRules[index], newRules[index - 1]]
    setRules(newRules)
  }

  const handleMoveDown = (id: string) => {
    const index = rules.findIndex((r) => r.id === id)
    if (index < 0 || index >= rules.length - 1) return
    const newRules = [...rules]
    ;[newRules[index], newRules[index + 1]] = [newRules[index + 1], newRules[index]]
    setRules(newRules)
  }

  const handleColorSelect = (bg: string, text: string) => {
    setBackgroundColor(bg)
    setTextColor(text)
  }

  const handleImageSelect = (image: StoredImage | null) => {
    setCurrentImageId(image?.id ?? null)
  }

  const handleImageAdd = (image: StoredImage) => {
    setStoredImages((prev) => [...prev, image])
  }

  const handleImageRemove = (id: string) => {
    setStoredImages((prev) => prev.filter((img) => img.id !== id))
    if (currentImageId === id) {
      setCurrentImageId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MyRules</h1>
            <p className="text-sm text-gray-600">Create your personal rules wallpaper</p>
          </div>
          {saveStatus && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {saveStatus === 'saving' ? (
                <span>Saving...</span>
              ) : (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Saved</span>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <TitleEditor title={title} onChange={setTitle} />
            <RulesList
              rules={rules}
              onUpdate={handleUpdateRule}
              onDelete={handleDeleteRule}
              onAdd={handleAddRule}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
            <PositionSelector position={titlePosition} onChange={setTitlePosition} />
            <ImageUploader
              currentImageId={currentImageId}
              storedImages={storedImages}
              onImageSelect={handleImageSelect}
              onImageAdd={handleImageAdd}
              onImageRemove={handleImageRemove}
            />
            <ColorPicker
              selectedBg={backgroundColor}
              onSelect={handleColorSelect}
            />
            <ExportButton onExport={download} />
          </div>

          {/* Preview Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Preview canvasRef={canvasRef} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
