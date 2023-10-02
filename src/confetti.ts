import { getCanvas, getCanvasOrigin, setCanvasZIndex } from './canvas'
import { randomNumberBetween, convertHexToRGB } from './utils'
import { Ellipse, Circle, Square, Star, Emoji, ConfettiProperties, ConfettiGlobals, ConfettiProps, RGB } from './types'

const fettis: any = []
let fettiGlobals: ConfettiProps

const confettiGlobals: ConfettiGlobals = {
    count: 100,
    gravity: 1,
    drag: 0.075,
    ticks: 300,
    decay: 0.9,
    drift: 0,
    angle: 90,
    spread: 70,
    velocity: 45,
    scales: [ 0.7, 0.8 ],
    x: 0.5,
    y: 0.5,
    z: 100,
    shapes: [ 'square', 'ellipse' ],
    colors: [
        '#33ffdd',
        '#29c6ff',
        '#b980ff',
        '#ff66ff',
        '#ff6685',
        '#ffb54d',
        '#fcff66',
        '#91ff66'
    ],
    emojis: [ '🛸', '👽', '✨' ]
}

/**
 * Create confetti
 *
 * @return {void}
 */
const createConfetti = (props: ConfettiProps = confettiGlobals): void => {
    fettiGlobals = props
    fillConfettiCannon()
}

/**
 * Fill confetti cannon
 *
 * @return {void}
 */
const fillConfettiCannon = (): void => {
    const count = fettiGlobals ? fettiGlobals.count ? fettiGlobals.count : confettiGlobals.count : confettiGlobals.count
    for (let i = 0; i < count; i++) {
        fettis.push(confettiProperties())
    }
}

/**
 * Create emoji confetti
 *
 * @param {Emoji} data
 */
const createEmoji = (data: Emoji): void => {
    const context = data.context
    context.beginPath()
    context.font = (data.size * 100) + 'px serif'
    context.fillText(data.emoji, data.x, data.y)
    context.restore()
    context.closePath()
    context.fill()
}

/**
 * Create circle confetti
 *
 * @param {Circle} data
 */
const createCircle = (data: Circle): void => {
    const context = data.context
    context.beginPath()
    context.save()
    context.translate(data.x, data.y)
    context.arc(0, 0, data.scale * 10, 0, 2 * Math.PI)
    context.restore()
    context.closePath()
    context.fill()
}

/**
 * Create ellipse confetti
 *
 * @param {Ellipse} data
 */
const createEllipse = (data: Ellipse): void => {
    const context = data.context
    context.beginPath()
    context.save()
    context.translate(data.x, data.y)
    context.rotate(data.rotation)
    context.scale(data.radius.x, data.radius.y)
    context.arc(0, 0, 1, data.angle.start, data.angle.end, data.antiClockwise)
    context.restore()
    context.closePath()
    context.fill()
}

/**
 * Create square confetti
 *
 * @param {Square} data
 */
const createSquare = (data: Square): void => {
    const context = data.context
    context.beginPath()
    context.moveTo(data.x, data.y)
    context.lineTo(data.line1.x, data.line1.y)
    context.lineTo(data.line2.x, data.line2.y)
    context.lineTo(data.line3.x, data.line3.y)
    context.closePath()
    context.fill()
}

/**
 * Create star confetti
 *
 * @param {Star} data
 */
const createStar = (data: Star): void => {

    var rotation = (Math.PI / 2) * 3
    var spikes = 5

    const innerRadius = 4 * data.scale
    const outerRadius = 8 * data.scale
    const step = Math.PI / spikes

    const context = data.context
    context.beginPath()

    while (spikes--) {

        const x1 = data.x + (Math.cos(rotation) * outerRadius)
        const y1 = data.y + (Math.sin(rotation) * outerRadius)

        context.lineTo(x1, y1)
        rotation += step

        const x2 = data.x + (Math.cos(rotation) * innerRadius)
        const y2 = data.y + (Math.sin(rotation) * innerRadius)

        context.lineTo(x2, y2)
        rotation += step

    }

    context.closePath()
    context.fill()
}

/**
 * Confetti properties
 *
 * @return {void}
 */
const confettiProperties = (): ConfettiProperties => {

    const props = fettiGlobals

    const xPos = props ? props.canvas ? getCanvasOrigin({ id: props.canvas }).x : props.x ? getCanvasOrigin({ x: props.x }).x : getCanvasOrigin().x : getCanvasOrigin().x
    const yPos = props ? props.canvas ? getCanvasOrigin({ id: props.canvas }).y : props.y ? getCanvasOrigin({ y: props.y }).y : getCanvasOrigin().y : getCanvasOrigin().y
    const colors = props ? props.colors ? props.colors : confettiGlobals.colors : confettiGlobals.colors
    const shapes = props ? props.shapes ? props.shapes : confettiGlobals.shapes : confettiGlobals.shapes
    const emojis = props ? props.emojis ? props.emojis : confettiGlobals.emojis : confettiGlobals.emojis
    const angle = props ? props.angle ? props.angle : confettiGlobals.angle : confettiGlobals.angle
    const spread = props ? props.spread ? props.spread : confettiGlobals.spread : confettiGlobals.spread
    const gravity = props ? props.gravity ? props.gravity : confettiGlobals.gravity : confettiGlobals.gravity
    const velocity = props ? props.velocity ? props.velocity : confettiGlobals.velocity : confettiGlobals.velocity
    const ticks = props ? props.ticks ? props.ticks : confettiGlobals.ticks : confettiGlobals.ticks
    const drift = props ? props.drift ? props.drift : confettiGlobals.drift : confettiGlobals.drift
    const decay = props ? props.decay ? props.decay : confettiGlobals.decay : confettiGlobals.decay
    const scales = props ? props.scales ? props.scales : confettiGlobals.scales : confettiGlobals.scales
    
    const scale = scales[Math.floor(randomNumberBetween(0, scales.length))]
    const emoji = emojis[Math.floor(randomNumberBetween(0, emojis.length))]
    const color = convertHexToRGB(colors[Math.floor(randomNumberBetween(0, colors.length))]) as unknown as RGB
    const shape = shapes[Math.floor(randomNumberBetween(0, shapes.length))]
    const tiltAngle = (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI
    const radiusAngle = angle * (Math.PI / 180)
    const radiusSpread = spread * (Math.PI / 180)
    const wabble = Math.random() * 10
    const wabbleSpeed = Math.min(0.11, Math.random() * 0.1 + 0.05)
    const speed = (velocity * 0.5) + (Math.random() * velocity)
    const angle2D = -radiusAngle + ((0.5 * radiusSpread) - (Math.random() * radiusSpread))
    const random = Math.random() + 2

    return {
        opacity: ticks >= 0,
        tick: 0,
        progress: 0,
        color: color,
        shape: shape,
        emoji: emoji,
        gravity: gravity * 3,
        velocity: speed,
        angle2D: angle2D,
        drift: drift,
        decay: decay,
        scale: scale,
        random: random,
        wabble: {
            w: wabble,
            x: 0,
            y: 0,
            speed: wabbleSpeed
        },
        tilt: {
            angle: tiltAngle,
            sin: 0,
            cos: 0
        },
        dimensions: {
            x: randomNumberBetween(4, 8),
            y: randomNumberBetween(6, 12)
        },
        position: {
            x: xPos,
            y: yPos
        },
        update: function () {
            this.position.x += Math.cos(this.angle2D) * this.velocity + this.drift
            this.position.y += Math.sin(this.angle2D) * this.velocity + this.gravity
            this.velocity *= this.decay
            this.tilt.angle += 0.1
            this.tilt.sin = Math.sin(this.tilt.angle)
            this.tilt.cos = Math.cos(this.tilt.angle)
            this.random = Math.random() + 2
            this.wabble.w += this.wabble.speed
            this.wabble.x = this.position.x + ((10 * scale) * Math.cos(this.wabble.w))
            this.wabble.y = this.position.y + ((10 * scale) * Math.sin(this.wabble.w))
            this.progress = (this.tick++) / ticks
        }
    }
}

/**
 *  Create confetti shape
 *
 * @param {CanvasRenderingContext2D} context
 * @param {ConfettiProperties} fetti
 */
const createConfettiShape = (context: CanvasRenderingContext2D, fetti: ConfettiProperties): void => {

    var x1 = fetti.position.x + (fetti.random * fetti.tilt.cos)
    var y1 = fetti.position.y + (fetti.random * fetti.tilt.sin)
    var x2 = fetti.wabble.x + (fetti.random * fetti.tilt.cos)
    var y2 = fetti.wabble.y + (fetti.random * fetti.tilt.sin)

    fetti.opacity ? 
    (context.fillStyle = 'rgba(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ', ' + (1 - fetti.progress) + ')') :
    (context.fillStyle = 'rgb(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ')')

    if(fetti.shape == 'ellipse') {

        createEllipse({
            context: context,
            x: fetti.position.x,
            y: fetti.position.y,
            rotation: Math.PI / 10 * fetti.wabble.w,
            radius: {
                x: Math.abs(x2 - x1) * fetti.scale,
                y: Math.abs(y2 - y1) * fetti.scale
            },
            angle: {
                start: 0,
                end: 2 * Math.PI
            },
            antiClockwise: false
        })

    } else if(fetti.shape == 'circle') {

        createCircle({
            context: context,
            x: fetti.position.x,
            y: fetti.position.y,
            scale: fetti.scale,
        })

    } else if(fetti.shape == 'star') {

        createStar({
            context: context,
            x: fetti.position.x,
            y: fetti.position.y,
            scale: fetti.scale
        })

    } else if(fetti.shape == 'emoji') {

        createEmoji({
            context: context,
            emoji: fetti.emoji,
            x: fetti.position.x,
            y: fetti.position.y,
            size: fetti.scale
        })

    } else {

        createSquare({
            context: context,
            x: fetti.position.x,
            y: fetti.position.y,
            line1: {
                x: fetti.wabble.x,
                y: fetti.position.y
            },
            line2: {
                x: x2,
                y: y2
            },
            line3: {
                x: x1,
                y: fetti.wabble.y
            }
        })

    }
}

/**
 * Render confetti
 *
 * @return {void} 
 */
const renderConfetti = (): void => {

    if(!window) return

    const canvas = fettiGlobals ? fettiGlobals.canvas ? getCanvas(fettiGlobals.canvas) : getCanvas() : getCanvas()
    const context: any = canvas.getContext("2d")

    fettiGlobals ? fettiGlobals.z ? setCanvasZIndex(canvas.id, fettiGlobals.z) : '' : ''

    context.clearRect(0, 0, canvas.width, canvas.height)
    
    fettis.forEach((fetti: any) => {
        fetti.update()
        createConfettiShape(context, fetti)
    })
  
    fettis.forEach((fetti: any, index: number) => {
        if (fetti.position.y >= canvas.height || fetti.position.y <= 0) fettis.splice(index, 1)
        if (fetti.position.x >= canvas.width || fetti.position.x <= 0) fettis.splice(index, 1)
    })

    window.requestAnimationFrame(renderConfetti)

}

export {
    createConfetti,
    renderConfetti
}