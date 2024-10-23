import { ConfettiGlobals, RGB } from './types'
import { getCanvasPos } from './canvas'

/**
 * Generate random number between two numbers (min/max)
 */
export const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min

/**
 * Convert hex format to RGB for opacity support (RGBA)
 */
export const convertHexToRGB = (hex: string): RGB | null => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

/**
 * Is SSR is a way to check if the function are running on the server.
 * When rendering on server there is no window.requestAnimationFrame(),
 * and if so we deactivate the lib so that it is not executed.
 */
export const isSSR = (() => {
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame === 'undefined') return true
    return false
})()

/**
 * Checking if the parameter is a number.
 */
export const isNumber = (param: any) => {
    return typeof param === 'number'
}

/**
 * Checks if there is a prop and if there isn't then returns a default value.
 */
export const convertProps = (props: any, globals: ConfettiGlobals): any => {

    let x, y, colors, shapes, emojis, angle, spread, gravity, speed, ticks, drift, decay, scale, quiet, overflow

    if(props) {

        if (props.canvas) {

            if (props.x) {
                x = getCanvasPos({ id: props.canvas, x: props.x }).x
            } else {
                x = getCanvasPos({ id: props.canvas, x: globals.x }).x
            }

            if (props.y) {
                y = getCanvasPos({ id: props.canvas, y: props.y }).y
            } else {
                y = getCanvasPos({ id: props.canvas, y: globals.y }).y
            }

        } else {

            if(props.x) {
                x = getCanvasPos({ x: props.x }).x
            } else {
                x = getCanvasPos({ x: globals.x }).x
            }

            if(props.y) {
                y = getCanvasPos({ y: props.y }).y
            } else {
                y = getCanvasPos({ y: globals.y }).y
            }

        }

    }

    colors = props ? props.colors ? props.colors : globals.colors : globals.colors
    shapes = props ? props.shapes ? props.shapes : globals.shapes : globals.shapes
    emojis = props ? props.emojis ? props.emojis : globals.emojis : globals.emojis

    gravity = props ? props.gravity ? isNumber(props.gravity) ? props.gravity : props.gravity[Math.floor(randomNumber(0, props.gravity.length))] : globals.gravity : globals.gravity

    scale = props ? props.scale ? isNumber(props.scale) ? props.scale : props.scale[Math.floor(randomNumber(0, props.scale.length))] : globals.scale : globals.scale

    speed = props ? props.speed ? isNumber(props.speed) ? props.speed : props.speed[Math.floor(randomNumber(0, props.speed.length))] : globals.speed : globals.speed

    overflow = {
        left: props ? props.overflow ? props.overflow.left ? props.overflow.left : globals.overflow.left : globals.overflow.left : globals.overflow.left,
        right: props ? props.overflow ? props.overflow.right ? props.overflow.right : globals.overflow.right : globals.overflow.right : globals.overflow.right,
        top: props ? props.overflow ? props.overflow.top ? props.overflow.top : globals.overflow.top : globals.overflow.top : globals.overflow.top,
        bottom: props ? props.overflow ? props.overflow.bottom ? props.overflow.bottom : globals.overflow.bottom : globals.overflow.bottom : globals.overflow.bottom
    }

    spread = props ? props.spread ? props.spread : globals.spread : globals.spread
    angle = props ? props.angle ? props.angle : globals.angle : globals.angle
    ticks = props ? props.ticks ? props.ticks : globals.ticks : globals.ticks
    drift = props ? props.drift ? props.drift : globals.drift : globals.drift
    decay = props ? props.decay ? props.decay : globals.decay : globals.decay
    quiet = props ? props.quiet ? props.quiet : globals.quiet : globals.quiet

    return {

        x,
        y,

        colors,
        shapes,
        emojis,

        gravity,
        scale,
        speed,

        angle,
        spread,
        ticks,
        drift,
        decay,
        quiet,

        overflow

    }

}
