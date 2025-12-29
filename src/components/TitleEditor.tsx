interface TitleEditorProps {
  title: string
  onChange: (title: string) => void
}

export function TitleEditor({ title, onChange }: TitleEditorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Title</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="MY RULES"
        maxLength={30}
      />
    </div>
  )
}
