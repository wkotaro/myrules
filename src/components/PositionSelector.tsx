import { TitlePosition } from '../utils/canvas'

interface PositionSelectorProps {
  position: TitlePosition
  onChange: (position: TitlePosition) => void
}

const positions: { value: TitlePosition; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'middle', label: 'Middle' },
  { value: 'low', label: 'Low' },
]

export function PositionSelector({ position, onChange }: PositionSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Title Position</h2>
      <div className="flex gap-2">
        {positions.map((pos) => (
          <button
            key={pos.value}
            onClick={() => onChange(pos.value)}
            className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
              position === pos.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400 text-gray-600'
            }`}
          >
            {pos.label}
          </button>
        ))}
      </div>
    </div>
  )
}
