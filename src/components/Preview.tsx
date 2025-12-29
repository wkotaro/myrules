import { ASPECT_RATIO } from '../types'

interface PreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export function Preview({ canvasRef }: PreviewProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Preview</h2>
      <div
        className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
        style={{
          width: '280px',
          height: `${280 / ASPECT_RATIO}px`,
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">iPhone 14/15 Pro Max (1290 x 2796)</p>
    </div>
  )
}
