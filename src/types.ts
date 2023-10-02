export type Emoji = {
    context: CanvasRenderingContext2D
    emoji: string
    x: number
    y: number
    size: number
}

export type Circle = {
    context: CanvasRenderingContext2D
    x: number
    y: number
    scale: number
}

export type Ellipse = {
    context: CanvasRenderingContext2D
    x: number
    y: number
    rotation: number
    radius: {
        x: number
        y: number
    }
    angle: {
        start: number
        end: number
    }
    antiClockwise: boolean
}

export type Square = {
    context: CanvasRenderingContext2D
    x: number
    y: number
    line1: {
        x: number
        y: number
    }
    line2: {
        x: number
        y: number
    }
    line3: {
        x: number
        y: number
    }
}

export type Star = {
    context: CanvasRenderingContext2D
    scale: number
    x: number
    y: number
}

type Shapes = 'square' | 'ellipse' | 'circle' | 'star' | 'emoji'

export type ConfettiGlobals = {
    count: number
    gravity: number
    drag: number
    ticks: number
    decay: number
    drift: number
    angle: number
    spread: number
    velocity: number
    scales: number[]
    static: boolean
    x: number
    y: number
    z: number
    shapes: Shapes[]
    colors: string[]
    emojis: string[]
}

export type ConfettiProps = {
    canvas?: string
    count?: number
    gravity?: number
    drag?: number
    ticks?: number
    decay?: number
    drift?: number
    angle?: number
    spread?: number
    velocity?: number
    scales?: number[]
    static?: boolean
    x?: number
    y?: number
    z?: number
    shapes?: Shapes[]
    colors?: string[]
    emojis?: string[]
}

export type ConfettiProperties = {
    opacity: boolean
    tick: number
    progress: number
    color: {
        r: number
        g: number
        b: number
    }
    shape: string
    emoji: string
    gravity: number
    velocity: number
    angle2D: number
    drift: number
    decay: number
    scale: number,
    random: number
    static: boolean
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
    dimensions: {
        x: number
        y: number
    }
    position: {
        x: number
        y: number
    }
    update: () => void
}

export type RGB = {
    r: number,
    g: number,
    b: number
}