import { useState, useMemo } from 'react'
import { Rule, DEFAULT_RULES, PRESET_COLORS } from './types'
import { useWallpaperCanvas } from './hooks/useWallpaperCanvas'
import { RulesList } from './components/RulesList'
import { ColorPicker } from './components/ColorPicker'
import { Preview } from './components/Preview'
import { ExportButton } from './components/ExportButton'
import { TitleEditor } from './components/TitleEditor'

function App() {
  const [title, setTitle] = useState('My Rules')
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES)
  const [backgroundColor, setBackgroundColor] = useState(PRESET_COLORS[0].bg)
  const [textColor, setTextColor] = useState(PRESET_COLORS[0].text)

  const canvasOptions = useMemo(
    () => ({ title, rules, backgroundColor, textColor }),
    [title, rules, backgroundColor, textColor]
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">MyRules</h1>
          <p className="text-sm text-gray-600">Create your personal rules wallpaper</p>
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
