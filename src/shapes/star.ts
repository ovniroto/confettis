import { ConfettiProperties } from '../types'

/**
 * Star Shape
 *
 * @param {CanvasRenderingContext2D} context
 * @param {ConfettiProperties} fetti
 */
const starShape = (context: CanvasRenderingContext2D, fetti: ConfettiProperties): void => {

    var rotation = (Math.PI / 2) * 3
    var spikes = 5

    const innerRadius = 4 * fetti.scale
    const outerRadius = 8 * fetti.scale
    const step = Math.PI / spikes

    context.beginPath()

    while (spikes--) {

        const x1 = fetti.position.x + (Math.cos(rotation) * outerRadius)
        const y1 = fetti.position.y + (Math.sin(rotation) * outerRadius)

        context.lineTo(x1, y1)
        rotation += step

        const x2 = fetti.position.x + (Math.cos(rotation) * innerRadius)
        const y2 = fetti.position.y + (Math.sin(rotation) * innerRadius)

        context.lineTo(x2, y2)
        rotation += step

    }

    context.closePath()
    context.fill()
}

export default starShape