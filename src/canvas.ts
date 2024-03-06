/**
 * Create new canvas element
 *
 * @return {HTMLCanvasElement} HTMLCanvasElement
 */
const createCanvas = (): HTMLCanvasElement => {

    const canvas = document.createElement("canvas")

    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight

    canvas.id = "confettis"

    canvas.style.zIndex = `${Number.MAX_SAFE_INTEGER}`
    canvas.style.position = 'fixed'
    canvas.style.top = '0px'
    canvas.style.left = '0px'
    canvas.style.pointerEvents = 'none'

    document.body.appendChild(canvas)

    return canvas

}

/**
 * Set canvas z-index
 *
 * @param {string} id `string` Default "confettis"
 * @param {string} z `string` Default Number.MAX_SAFE_INTEGER (2147483647)
 * @return {HTMLCanvasElement}  HTMLCanvasElement
 */
const setCanvasZIndex = (id: string = "confettis", z: number = Number.MAX_SAFE_INTEGER): void => {
    let canvas = document.getElementById(id) as unknown as HTMLCanvasElement
    canvas.style.zIndex = `${z}`
}

/**
 * Get canvas confetti
 *
 * @param {string} id `string` Default "confettis"
 * @return {HTMLCanvasElement}  HTMLCanvasElement
 */
const getCanvas = (id: string = "confettis"): HTMLCanvasElement => {
    let canvas = document.getElementById(id) as unknown as HTMLCanvasElement
    if(!canvas) canvas = createCanvas()
    return canvas
}

/**
 * Set canvas custom size
 *
 * @param {number} width `number`
 * @param {number} height `number`
 * @return {void} void
 */
const setCanvasSize = (width: number, height: number, id: string = "confettis"): void => {
    const canvas = getCanvas(id)
    canvas.width = width
    canvas.height = height
}

/**
 * Set canvas window size
 *
 * @return {void} void
 */
const setCanvasWindowSize = (id: string = "confettis"): void => {
    const canvas = getCanvas(id)
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
}

/**
 * Set canvas rect size
 *
 * @return {void} void
 */
const setCanvasRectSize = (id: string = "confettis"): void => {
    const canvas = getCanvas(id)
    var rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
}

/**
 * Get canvas positions
 *
 * @return {void} void
 */
const getCanvasPos = (data?: { id?: string, x?: number, y?: number }): { x: number, y: number } => {

    const id = data ? data.id ? data.id : 'confettis' : 'confettis'
    const x = data ? data.x ? data.x : 0.5 : 0.5
    const y = data ? data.y ? data.y : 0.5 : 0.5

    const canvas = getCanvas(id)

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const canvasX = Math.max(0, Math.min(x * canvasWidth, canvasWidth))
    const canvasY = Math.max(0, Math.min(y * canvasHeight, canvasHeight))

    return {
        x: canvasX,
        y: canvasY
    }

}

export {

    createCanvas,

    getCanvas,
    getCanvasPos,

    setCanvasSize,
    setCanvasWindowSize,
    setCanvasRectSize,
    setCanvasZIndex

}