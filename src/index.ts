import { setCanvasWindowSize } from './canvas'
import { renderConfetti } from './confetti'
import { isSSR } from './utils'

export { createConfetti as create } from './confetti'

if (!isSSR) {
    window.addEventListener('resize', () => { setCanvasWindowSize() })
    window.requestAnimationFrame(renderConfetti)
}