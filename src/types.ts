type Shapes = 'square' | 'rectangle' | 'ellipse' | 'circle' | 'star' | 'emoji'

export type ConfettiGlobals = {

    x: number
    y: number
    z: number

    canvas: string
    count: number

    gravity: number | number[]
    ticks: number | number[]
    speed: number | number[]
    scale: number | number[]

    overflow: {
        left: boolean
        right: boolean
        top: boolean
        bottom: boolean
    }

    decay: number
    drift: number
    angle: number
    spread: number
    quiet: boolean

    shapes: Shapes[]
    colors: string[]
    emojis: string[]

}

export type ConfettiProps = {

    x?: number
    y?: number
    z?: number

    canvas?: string
    count?: number

    gravity?: number | number[]
    ticks?: number | number[]
    speed?: number | number[]
    scale?: number | number[]

    overflow?: {
        left?: boolean
        right?: boolean
        top?: boolean
        bottom?: boolean
    }

    decay?: number
    drift?: number
    angle?: number
    spread?: number
    quiet?: boolean

    shapes?: string[]
    colors?: string[]
    emojis?: string[]

}

export type ConfettiProperties = {

    random: number
    angle2d: number
    opacity: boolean
    progress: number

    wabble: {
        w: number
        x: number
        y: number
        speed: number
    }
    tilt: {
        angle: number
        sin: number
        cos: number
    }

    shape: string
    emoji: string

    tick: number
    gravity: number
    speed: number
    drift: number
    decay: number
    scale: number
    quiet: boolean

    overflow: {
        left: boolean
        right: boolean
        top: boolean
        bottom: boolean
    }

    color: {
        r: number
        g: number
        b: number
    }

    position: {
        x: number
        y: number
    }

    update: () => void

}

export type RGB = {
    r: number
    g: number
    b: number
}
