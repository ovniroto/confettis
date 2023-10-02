import { setCanvasWindowSize } from './canvas'
import { renderConfetti } from './confetti'

export { createConfetti as create } from './confetti'

if(window) {
    window.addEventListener('resize', () => { setCanvasWindowSize() })
    window.requestAnimationFrame(renderConfetti)
}