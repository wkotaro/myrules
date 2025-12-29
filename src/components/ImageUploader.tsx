import { useRef } from 'react'

export interface StoredImage {
  id: string
  dataUrl: string
  element: HTMLImageElement
}

interface ImageUploaderProps {
  currentImageId: string | null
  storedImages: StoredImage[]
  onImageSelect: (image: StoredImage | null) => void
  onImageAdd: (image: StoredImage) => void
  onImageRemove: (id: string) => void
}

export function ImageUploader({
  currentImageId,
  storedImages,
  onImageSelect,
  onImageAdd,
  onImageRemove,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      const img = new Image()
      img.onload = () => {
        const newImage: StoredImage = {
          id: Date.now().toString(),
          dataUrl,
          element: img,
        }
        onImageAdd(newImage)
        onImageSelect(newImage)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)

    // Reset input so same file can be uploaded again
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onImageRemove(id)
    if (currentImageId === id) {
      onImageSelect(null)
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Background Image</h2>

      {/* Image Gallery */}
      <div className="flex flex-wrap gap-2">
        {/* No image option */}
        <button
          onClick={() => onImageSelect(null)}
          className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all ${
            currentImageId === null
              ? 'border-blue-500 bg-gray-100'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
          title="No background image"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Stored images */}
        {storedImages.map((img) => (
          <div key={img.id} className="relative group">
            <button
              onClick={() => onImageSelect(img)}
              className={`w-14 h-14 rounded-lg border-2 overflow-hidden transition-all ${
                currentImageId === img.id
                  ? 'border-blue-500 scale-105'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={img.dataUrl}
                alt="Stored background"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={(e) => handleRemove(img.id, e)}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              title="Remove image"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {/* Add new image button */}
        <label className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </label>
      </div>

      <p className="text-xs text-gray-500">
        {storedImages.length} image{storedImages.length !== 1 ? 's' : ''} stored
      </p>
    </div>
  )
}
