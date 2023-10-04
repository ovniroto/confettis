import { ConfettiProperties } from '../types'

/**
 * Emoji Shape
 *
 * @param {CanvasRenderingContext2D} context
 * @param {ConfettiProperties} fetti
 */
const emojiShape = (context: CanvasRenderingContext2D, fetti: ConfettiProperties): void => {
    context.beginPath()
    context.font = (fetti.scale * 100) + 'px serif'
    context.fillText(fetti.emoji, fetti.position.x, fetti.position.y)
    context.restore()
    context.closePath()
    context.fill()
}

export default emojiShape