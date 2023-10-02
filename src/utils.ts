type RGB = { r: number, g: number, b: number }

export const randomNumberBetween = (min: number, max: number) => Math.random() * (max - min) + min

export const convertHexToRGB = (hex: string): RGB | null => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

export const isSSR = (() => {
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame === 'undefined') return true
    return false
})()