import { Rule, WALLPAPER_WIDTH, WALLPAPER_HEIGHT, WritingMode, JAPANESE_NUMERALS } from '../types'

export type TitlePosition = 'high' | 'middle' | 'low'

interface DrawOptions {
  title: string
  rules: Rule[]
  backgroundColor: string
  textColor: string
  backgroundImage?: HTMLImageElement | null
  titlePosition?: TitlePosition
  writingMode?: WritingMode
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

  const { title, rules, backgroundColor, textColor, backgroundImage, titlePosition = 'high', writingMode = 'horizontal' } = options
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

  if (writingMode === 'vertical') {
    drawVerticalWallpaper(ctx, title, rules, titlePosition, width, height)
  } else {
    drawHorizontalWallpaper(ctx, title, rules, titlePosition, width, height)
  }
}

function drawHorizontalWallpaper(
  ctx: CanvasRenderingContext2D,
  title: string,
  rules: Rule[],
  titlePosition: TitlePosition,
  width: number,
  height: number
): void {
  ctx.textAlign = 'center'

  // Draw title (positioned based on titlePosition setting)
  const titleFontSize = 90
  ctx.font = `bold ${titleFontSize}px system-ui, -apple-system, sans-serif`
  const positionMap = { high: 0.35, middle: 0.45, low: 0.55 }
  const titleY = height * positionMap[titlePosition]
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

function drawVerticalWallpaper(
  ctx: CanvasRenderingContext2D,
  title: string,
  rules: Rule[],
  titlePosition: TitlePosition,
  width: number,
  height: number
): void {
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Draw vertical title in upper-right area
  const titleFontSize = 90
  ctx.font = `bold ${titleFontSize}px system-ui, -apple-system, sans-serif`
  const titleCharHeight = titleFontSize * 1.2
  const titleX = width * 0.85
  const titleStartY = height * 0.15

  // Draw title characters vertically
  const titleText = title.toUpperCase()
  let titleY = titleStartY
  for (const char of titleText) {
    ctx.fillText(char, titleX, titleY)
    titleY += titleCharHeight
  }

  // Draw rules vertically (right to left columns)
  const ruleFontSize = 48
  const ruleCharHeight = ruleFontSize * 1.3
  ctx.font = `${ruleFontSize}px system-ui, -apple-system, sans-serif`

  const columnSpacing = 120
  const rulesPositionMap = { high: 0.20, middle: 0.40, low: 0.60 }
  const rulesStartY = height * rulesPositionMap[titlePosition]
  const maxCharsPerColumn = Math.floor((height - rulesStartY - 100) / ruleCharHeight)

  // Calculate starting X position (start from right side)
  const totalRulesWidth = rules.length * columnSpacing
  let currentX = (width + totalRulesWidth) / 2 - columnSpacing / 2

  rules.forEach((rule, index) => {
    // Draw Japanese numeral prefix
    const prefix = JAPANESE_NUMERALS[index] || `${index + 1}`
    let currentY = rulesStartY

    ctx.fillText(prefix, currentX, currentY)
    currentY += ruleCharHeight * 1.2

    // Draw rule text character by character
    const chars = rule.text.split('')
    for (let i = 0; i < chars.length && i < maxCharsPerColumn; i++) {
      ctx.fillText(chars[i], currentX, currentY)
      currentY += ruleCharHeight
    }

    // Move to next column (left)
    currentX -= columnSpacing
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
