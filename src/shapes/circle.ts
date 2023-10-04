import { ConfettiProperties } from '../types'

/**
 * Circle Shape
 *
 * @param {CanvasRenderingContext2D} context
 * @param {ConfettiProperties} fetti
 */
const circleShape = (context: CanvasRenderingContext2D, fetti: ConfettiProperties): void => {
    context.beginPath()
    context.save()
    context.translate(fetti.position.x, fetti.position.y)
    context.arc(0, 0, fetti.scale * 10, 0, 2 * Math.PI)
    context.restore()
    context.closePath()
    context.fill()
}

export default circleShape