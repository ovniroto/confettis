import { getCanvas, setCanvasZIndex, setCanvasWindowSize } from './canvas'
import { randomNumber, convertHexToRGB, isSSR, isNumber, convertProps } from './utils'
import { ConfettiProperties, ConfettiGlobals, ConfettiProps, RGB } from './types'

import emojiShape from './shapes/emoji'
import ellipseShape from './shapes/ellipse'
import squareShape from './shapes/square'
import starShape from './shapes/star'
import circleShape from './shapes/circle'
import rectangleShape from './shapes/rectangle'

const fettis: any = []
let fettiGlobals: ConfettiProps

const confettiGlobals: ConfettiGlobals = {

    x: 0.5,
    y: 0.7,
    z: Number.MAX_SAFE_INTEGER,

    count: 100,

    gravity: 1,
    ticks: 300,
    speed: 45,
    scale: 0.8,

    overflow: {
        left: false,
        right: false,
        top: true,
        bottom: false,
    },

    decay: 0.92,
    drift: 0,
    angle: 90,
    spread: 70,
    quiet: false,

    shapes: [ 'square', 'ellipse' ],
    colors: [ '#33ffdd', '#29c6ff', '#b980ff', '#ff66ff', '#ff6685', '#ffb54d', '#fcff66', '#91ff66' ],
    emojis: [ '🛸', '👽', '✨' ]

}

const initConfetti = () => {
    if (isSSR) return
    window.addEventListener('resize', () => { setCanvasWindowSize() })
    window.requestAnimationFrame(renderConfetti)
}

/**
 * Create confetti
 *
 * @return {void}
 */
const createConfetti = (props?: ConfettiProps): void => {

    if (isSSR) return

    fettiGlobals = props ? props : confettiGlobals
    const count = fettiGlobals ? fettiGlobals.count ? fettiGlobals.count : confettiGlobals.count : confettiGlobals.count

    for (let i = 0; i < count; i++) {
        fettis.push(confettiProperties())
    }

}

/**
 * Confetti properties
 *
 * @return {void}
 */
const confettiProperties = (): ConfettiProperties => {

    const props = convertProps(fettiGlobals, confettiGlobals)

    const color = convertHexToRGB(props.colors[Math.floor(randomNumber(0, props.colors.length))]) as unknown as RGB
    const emoji = props.emojis[Math.floor(randomNumber(0, props.emojis.length))]
    const shape = props.shapes[Math.floor(randomNumber(0, props.shapes.length))]

    const radius = {
        angle: props.angle * (Math.PI / 180),
        spread: props.spread * (Math.PI / 180)
    }
    
    const random = Math.random() + 2
    const angle2d = -radius.angle + ((0.5 * radius.spread) - (Math.random() * radius.spread))
    const tilt = {
        angle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
        sin: 0,
        cos: 0
    }

    const gravity = props.gravity * 3
    const scale = props.scale
    const speed = (props.speed * 0.5) + (Math.random() * props.speed)

    const opacity = isNumber(props.ticks) ? props.ticks >= 0 : props.ticks[Math.floor(randomNumber(0, props.ticks.length))] >= 0
    const progress = isNumber(props.ticks) ? props.ticks : props.ticks[Math.floor(randomNumber(0, props.ticks.length))]

    const ticks = 0

    const drift = props.drift
    const decay = props.decay
    const quiet = props.quiet

    const overflow = props.overflow

    const x = props.x
    const y = props.y

    const wabble = {
        w: Math.random() * 10,
        speed: Math.min(0.11, Math.random() * 0.1 + 0.05),
        x: 0,
        y: 0
    }
  
    return {

        random: random,
        angle2d: angle2d,
        opacity: opacity,
        progress: progress,
    
        wabble: {
            w: wabble.w,
            x: wabble.x,
            y: wabble.y,
            speed: wabble.speed
        },

        tilt: {
            angle: tilt.angle,
            sin: tilt.sin,
            cos: tilt.cos
        },
        
        shape: shape,
        emoji: emoji,
    
        tick: ticks,
        gravity: gravity,
        speed: speed,
        drift: drift,
        decay: decay,
        scale: scale,
        quiet: quiet,

        overflow: overflow,
    
        color: {
            r: color.r,
            g: color.g,
            b: color.b
        },

        position: {
            x: x,
            y: y
        },
    
        update: function () {

            this.position.x += Math.cos(this.angle2d) * this.speed + this.drift
            this.position.y += Math.sin(this.angle2d) * this.speed + this.gravity
            this.speed *= this.decay

            if(this.quiet) {

                this.tilt.sin = 0
                this.tilt.cos = 0
                this.random = 1

                this.wabble.w = 0
                this.wabble.x = this.position.x + (10 * scale)
                this.wabble.y = this.position.y + (10 * scale)

            } else {

                this.tilt.angle += 0.1
                this.tilt.sin = Math.sin(this.tilt.angle)
                this.tilt.cos = Math.cos(this.tilt.angle)

                this.random = Math.random() + 2
                this.wabble.w += this.wabble.speed
                this.wabble.x = this.position.x + ((10 * scale) * Math.cos(this.wabble.w))
                this.wabble.y = this.position.y + ((10 * scale) * Math.sin(this.wabble.w))
                
            }

            this.progress = (this.tick++) / progress

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

    fetti.opacity ? 
    (context.fillStyle = 'rgba(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ', ' + (1 - fetti.progress) + ')') :
    (context.fillStyle = 'rgb(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ')')

    if(fetti.shape == 'square') squareShape(context, fetti)
    if(fetti.shape == 'ellipse') ellipseShape(context, fetti)
    if(fetti.shape == 'rectangle') rectangleShape(context, fetti)
    if(fetti.shape == 'circle')  circleShape(context, fetti)
    if(fetti.shape == 'star') starShape(context, fetti)
    if(fetti.shape == 'emoji') emojiShape(context, fetti)

}

/**
 * Render confetti
 *
 * @return {void} 
 */
const renderConfetti = (): void => {

    const canvas = fettiGlobals ? fettiGlobals.canvas ? getCanvas(fettiGlobals.canvas) : getCanvas() : getCanvas()
    const context: any = canvas.getContext("2d")

    fettiGlobals ? fettiGlobals.z ? setCanvasZIndex(canvas.id, fettiGlobals.z) : '' : ''

    context.clearRect(0, 0, canvas.width, canvas.height)
    
    fettis.forEach((fetti: any) => {
        fetti.update()
        createConfettiShape(context, fetti)
    })

    fettis.forEach((fetti: any, index: number) => {

        if(!fetti.overflow?.left && fetti.position.x < 0) fettis.splice(index, 1)
        if(!fetti.overflow?.right && fetti.position.x > canvas.width) fettis.splice(index, 1)

        if(!fetti.overflow?.top && fetti.position.y < 0) fettis.splice(index, 1)
        if(!fetti.overflow?.bottom && fetti.position.y > canvas.height) fettis.splice(index, 1)
        
        if (fetti.progress >= 1) fettis.splice(index, 1)

    })

    window.requestAnimationFrame(renderConfetti)

}

export {
    createConfetti,
    initConfetti
}