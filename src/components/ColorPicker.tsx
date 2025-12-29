import { PRESET_COLORS } from '../types'

interface ColorPickerProps {
  selectedBg: string
  onSelect: (bg: string, text: string) => void
}

export function ColorPicker({ selectedBg, onSelect }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Background Color</h2>
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelect(color.bg, color.text)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              selectedBg === color.bg
                ? 'border-blue-500 scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color.bg }}
            title={color.name}
          />
        ))}
        <div className="relative">
          <input
            type="color"
            onChange={(e) => {
              const hex = e.target.value
              // Determine text color based on brightness
              const r = parseInt(hex.slice(1, 3), 16)
              const g = parseInt(hex.slice(3, 5), 16)
              const b = parseInt(hex.slice(5, 7), 16)
              const brightness = (r * 299 + g * 587 + b * 114) / 1000
              const textColor = brightness > 128 ? '#000000' : '#ffffff'
              onSelect(hex, textColor)
            }}
            className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-gray-400"
            title="Custom color"
          />
        </div>
      </div>
    </div>
  )
}
