import { WritingMode } from '../types'

interface WritingModeSelectorProps {
  writingMode: WritingMode
  onChange: (mode: WritingMode) => void
}

const modes: { value: WritingMode; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
]

export function WritingModeSelector({ writingMode, onChange }: WritingModeSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Writing Mode</h2>
      <div className="flex gap-2">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
              writingMode === mode.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400 text-gray-600'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  )
}
