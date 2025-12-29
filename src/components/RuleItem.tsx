import { Rule } from '../types'

interface RuleItemProps {
  rule: Rule
  index: number
  totalRules: number
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
}

export function RuleItem({
  rule,
  index,
  totalRules,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: RuleItemProps) {
  return (
    <div className="flex items-center gap-2 group">
      <span className="text-gray-500 w-6 text-right">{index + 1}.</span>
      <input
        type="text"
        value={rule.text}
        onChange={(e) => onUpdate(rule.id, e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your rule..."
      />
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onMoveUp(rule.id)}
          disabled={index === 0}
          className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Move up"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={() => onMoveDown(rule.id)}
          disabled={index === totalRules - 1}
          className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Move down"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(rule.id)}
          className="p-1.5 text-red-500 hover:text-red-700"
          title="Delete rule"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
