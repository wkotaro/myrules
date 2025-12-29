import { Rule, WALLPAPER_WIDTH, WALLPAPER_HEIGHT } from '../types'

interface DrawOptions {
  title: string
  rules: Rule[]
  backgroundColor: string
  textColor: string
  backgroundImage?: HTMLImageElement | null
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) {
    lines.push(currentLine)
  }
  return lines
}

export function drawWallpaper(
  canvas: HTMLCanvasElement,
  options: DrawOptions
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { title, rules, backgroundColor, textColor, backgroundImage } = options
  const width = WALLPAPER_WIDTH
  const height = WALLPAPER_HEIGHT

  canvas.width = width
  canvas.height = height

  // Fill background color first
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)

  // Draw background image if provided (cover mode)
  if (backgroundImage) {
    const imgRatio = backgroundImage.width / backgroundImage.height
    const canvasRatio = width / height
    let drawWidth, drawHeight, drawX, drawY

    if (imgRatio > canvasRatio) {
      // Image is wider - fit height, crop width
      drawHeight = height
      drawWidth = height * imgRatio
      drawX = (width - drawWidth) / 2
      drawY = 0
    } else {
      // Image is taller - fit width, crop height
      drawWidth = width
      drawHeight = width / imgRatio
      drawX = 0
      drawY = (height - drawHeight) / 2
    }

    ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight)
  }

  // Set text properties
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'

  // Draw title (positioned below iPhone lock screen clock)
  const titleFontSize = 90
  ctx.font = `bold ${titleFontSize}px system-ui, -apple-system, sans-serif`
  const titleY = height * 0.35
  ctx.fillText(title.toUpperCase(), width / 2, titleY)

  // Draw rules
  const ruleFontSize = 52
  const lineHeight = ruleFontSize * 1.6
  const maxTextWidth = width * 0.8
  const startY = titleY + 180
  let currentY = startY

  ctx.font = `${ruleFontSize}px system-ui, -apple-system, sans-serif`
  ctx.textAlign = 'left'
  const leftMargin = width * 0.1

  rules.forEach((rule, index) => {
    const prefix = `${index + 1}. `
    const prefixWidth = ctx.measureText(prefix).width
    const availableWidth = maxTextWidth - prefixWidth

    const wrappedLines = wrapText(ctx, rule.text, availableWidth)

    wrappedLines.forEach((line, lineIndex) => {
      if (lineIndex === 0) {
        ctx.fillText(prefix + line, leftMargin, currentY)
      } else {
        ctx.fillText(line, leftMargin + prefixWidth, currentY)
      }
      currentY += lineHeight
    })

    // Add extra spacing between rules
    currentY += lineHeight * 0.3
  })
}

export function downloadWallpaper(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 'image/png')
}
