import { useRef } from 'react'

interface ImageUploaderProps {
  currentImage: string | null
  onImageChange: (image: HTMLImageElement | null, dataUrl: string | null) => void
}

export function ImageUploader({ currentImage, onImageChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      const img = new Image()
      img.onload = () => {
        onImageChange(img, dataUrl)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onImageChange(null, null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Background Image</h2>
      <div className="flex items-center gap-3">
        <label className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-gray-600 text-sm">
            {currentImage ? 'Change image...' : 'Upload image...'}
          </span>
        </label>
        {currentImage && (
          <button
            onClick={handleRemove}
            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            Remove
          </button>
        )}
      </div>
      {currentImage && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <img
            src={currentImage}
            alt="Background preview"
            className="w-10 h-10 object-cover rounded"
          />
          <span>Image selected</span>
        </div>
      )}
    </div>
  )
}
