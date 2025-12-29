import { Rule } from '../types'
import { RuleItem } from './RuleItem'

interface RulesListProps {
  rules: Rule[]
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
  onAdd: () => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
}

export function RulesList({
  rules,
  onUpdate,
  onDelete,
  onAdd,
  onMoveUp,
  onMoveDown,
}: RulesListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Your Rules</h2>
        <span className="text-sm text-gray-500">{rules.length}/10</span>
      </div>
      <div className="space-y-2">
        {rules.map((rule, index) => (
          <RuleItem
            key={rule.id}
            rule={rule}
            index={index}
            totalRules={rules.length}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
          />
        ))}
      </div>
      {rules.length < 10 && (
        <button
          onClick={onAdd}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          + Add Rule
        </button>
      )}
    </div>
  )
}
