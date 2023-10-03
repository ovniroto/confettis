/*
 *
 *  🎉 Confettis v0.2.7
 *  https://github.com/ovniroto/confettis
 *
 *  (c) 2023 Lucas O. S.
 *  Confettis may be freely distributed under the MIT license.
 *
*/

'use strict';

/**
 * Create new canvas element
 *
 * @return {HTMLCanvasElement} HTMLCanvasElement
 */
const createCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    canvas.id = "confettis";
    canvas.style.zIndex = `${Number.MAX_SAFE_INTEGER}`;
    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    return canvas;
};
/**
 * Set canvas z-index
 *
 * @param {string} id `string` Default "confettis"
 * @param {string} z `string` Default Number.MAX_SAFE_INTEGER (2147483647)
 * @return {HTMLCanvasElement}  HTMLCanvasElement
 */
const setCanvasZIndex = (id = "confettis", z = Number.MAX_SAFE_INTEGER) => {
    let canvas = document.getElementById(id);
    canvas.style.zIndex = `${z}`;
};
/**
 * Get canvas confetti
 *
 * @param {string} id `string` Default "confettis"
 * @return {HTMLCanvasElement}  HTMLCanvasElement
 */
const getCanvas = (id = "confettis") => {
    let canvas = document.getElementById(id);
    if (!canvas)
        canvas = createCanvas();
    return canvas;
};
/**
 * Set canvas window size
 *
 * @return {void} void
 */
const setCanvasWindowSize = (id = "confettis") => {
    const canvas = getCanvas(id);
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
};
/**
 * Get canvas origin
 *
 * @return {void} void
 */
const getCanvasOrigin = (data) => {
    const id = data ? data.id ? data.id : 'confettis' : 'confettis';
    const x = data ? data.x ? data.x : 0.5 : 0.5;
    const y = data ? data.y ? data.y : 0.5 : 0.5;
    const canvas = getCanvas(id);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasX = Math.max(0, Math.min(x * canvasWidth, canvasWidth));
    const canvasY = Math.max(0, Math.min(y * canvasHeight, canvasHeight));
    return {
        x: canvasX,
        y: canvasY
    };
};

const randomNumberBetween = (min, max) => Math.random() * (max - min) + min;
const convertHexToRGB = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
const isSSR = (() => {
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame === 'undefined')
        return true;
    return false;
})();

const fettis = [];
let fettiGlobals;
const confettiGlobals = {
    count: 100,
    gravity: 1,
    drag: 0.075,
    ticks: 300,
    decay: 0.9,
    drift: 0,
    angle: 90,
    spread: 70,
    velocity: 45,
    scales: [0.7, 0.8],
    static: false,
    x: 0.5,
    y: 0.7,
    z: 100,
    shapes: ['square', 'ellipse'],
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
    emojis: ['🛸', '👽', '✨']
};
/**
 * Create confetti
 *
 * @return {void}
 */
const createConfetti = (props) => {
    if (isSSR)
        return;
    fettiGlobals = props ? props : confettiGlobals;
    fillConfettiCannon();
};
/**
 * Fill confetti cannon
 *
 * @return {void}
 */
const fillConfettiCannon = () => {
    const count = fettiGlobals ? fettiGlobals.count ? fettiGlobals.count : confettiGlobals.count : confettiGlobals.count;
    for (let i = 0; i < count; i++) {
        fettis.push(confettiProperties());
    }
};
/**
 * Create emoji confetti
 *
 * @param {Emoji} data
 */
const createEmoji = (data) => {
    const context = data.context;
    context.beginPath();
    context.font = (data.size * 100) + 'px serif';
    context.fillText(data.emoji, data.x, data.y);
    context.restore();
    context.closePath();
    context.fill();
};
/**
 * Create circle confetti
 *
 * @param {Circle} data
 */
const createCircle = (data) => {
    const context = data.context;
    context.beginPath();
    context.save();
    context.translate(data.x, data.y);
    context.arc(0, 0, data.scale * 10, 0, 2 * Math.PI);
    context.restore();
    context.closePath();
    context.fill();
};
/**
 * Create ellipse confetti
 *
 * @param {Ellipse} data
 */
const createEllipse = (data) => {
    const context = data.context;
    context.beginPath();
    context.save();
    context.translate(data.x, data.y);
    context.rotate(data.rotation);
    context.scale(data.radius.x, data.radius.y);
    context.arc(0, 0, 1, data.angle.start, data.angle.end, data.antiClockwise);
    context.restore();
    context.closePath();
    context.fill();
};
/**
 * Create square confetti
 *
 * @param {Square} data
 */
const createSquare = (data) => {
    const context = data.context;
    context.beginPath();
    context.moveTo(data.x, data.y);
    context.lineTo(data.line1.x, data.line1.y);
    context.lineTo(data.line2.x, data.line2.y);
    context.lineTo(data.line3.x, data.line3.y);
    context.closePath();
    context.fill();
};
/**
 * Create star confetti
 *
 * @param {Star} data
 */
const createStar = (data) => {
    var rotation = (Math.PI / 2) * 3;
    var spikes = 5;
    const innerRadius = 4 * data.scale;
    const outerRadius = 8 * data.scale;
    const step = Math.PI / spikes;
    const context = data.context;
    context.beginPath();
    while (spikes--) {
        const x1 = data.x + (Math.cos(rotation) * outerRadius);
        const y1 = data.y + (Math.sin(rotation) * outerRadius);
        context.lineTo(x1, y1);
        rotation += step;
        const x2 = data.x + (Math.cos(rotation) * innerRadius);
        const y2 = data.y + (Math.sin(rotation) * innerRadius);
        context.lineTo(x2, y2);
        rotation += step;
    }
    context.closePath();
    context.fill();
};
/**
 * Confetti properties
 *
 * @return {void}
 */
const confettiProperties = () => {
    const props = fettiGlobals;
    const xPos = props ? props.canvas ? getCanvasOrigin({ id: props.canvas }).x : props.x ? getCanvasOrigin({ x: props.x }).x : getCanvasOrigin().x : getCanvasOrigin().x;
    const yPos = props ? props.canvas ? getCanvasOrigin({ id: props.canvas }).y : props.y ? getCanvasOrigin({ y: props.y }).y : getCanvasOrigin().y : getCanvasOrigin().y;
    const colors = props ? props.colors ? props.colors : confettiGlobals.colors : confettiGlobals.colors;
    const shapes = props ? props.shapes ? props.shapes : confettiGlobals.shapes : confettiGlobals.shapes;
    const emojis = props ? props.emojis ? props.emojis : confettiGlobals.emojis : confettiGlobals.emojis;
    const angle = props ? props.angle ? props.angle : confettiGlobals.angle : confettiGlobals.angle;
    const spread = props ? props.spread ? props.spread : confettiGlobals.spread : confettiGlobals.spread;
    const gravity = props ? props.gravity ? props.gravity : confettiGlobals.gravity : confettiGlobals.gravity;
    const velocity = props ? props.velocity ? props.velocity : confettiGlobals.velocity : confettiGlobals.velocity;
    const ticks = props ? props.ticks ? props.ticks : confettiGlobals.ticks : confettiGlobals.ticks;
    const drift = props ? props.drift ? props.drift : confettiGlobals.drift : confettiGlobals.drift;
    const decay = props ? props.decay ? props.decay : confettiGlobals.decay : confettiGlobals.decay;
    const scales = props ? props.scales ? props.scales : confettiGlobals.scales : confettiGlobals.scales;
    const scale = scales[Math.floor(randomNumberBetween(0, scales.length))];
    const emoji = emojis[Math.floor(randomNumberBetween(0, emojis.length))];
    const shape = shapes[Math.floor(randomNumberBetween(0, shapes.length))];
    const color = convertHexToRGB(colors[Math.floor(randomNumberBetween(0, colors.length))]);
    const speed = (velocity * 0.5) + (Math.random() * velocity);
    const tiltAngle = (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI;
    const radiusAngle = angle * (Math.PI / 180);
    const radiusSpread = spread * (Math.PI / 180);
    const angle2D = -radiusAngle + ((0.5 * radiusSpread) - (Math.random() * radiusSpread));
    const wabble = Math.random() * 10;
    const wabbleSpeed = Math.min(0.11, Math.random() * 0.1 + 0.05);
    const random = Math.random() + 2;
    const stattic = props ? props.static ? props.static : false : false;
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
        static: stattic,
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
            this.position.x += Math.cos(this.angle2D) * this.velocity + this.drift;
            this.position.y += Math.sin(this.angle2D) * this.velocity + this.gravity;
            this.velocity *= this.decay;
            if (this.static) {
                this.tilt.sin = 0;
                this.tilt.cos = 0;
                this.random = 1;
                this.wabble.w = 0;
                this.wabble.x = this.position.x + (10 * scale);
                this.wabble.y = this.position.y + (10 * scale);
            }
            else {
                this.tilt.angle += 0.1;
                this.tilt.sin = Math.sin(this.tilt.angle);
                this.tilt.cos = Math.cos(this.tilt.angle);
                this.random = Math.random() + 2;
                this.wabble.w += this.wabble.speed;
                this.wabble.x = this.position.x + ((10 * scale) * Math.cos(this.wabble.w));
                this.wabble.y = this.position.y + ((10 * scale) * Math.sin(this.wabble.w));
            }
            this.progress = (this.tick++) / ticks;
        }
    };
};
/**
 *  Create confetti shape
 *
 * @param {CanvasRenderingContext2D} context
 * @param {ConfettiProperties} fetti
 */
const createConfettiShape = (context, fetti) => {
    var x1 = fetti.position.x + (fetti.random * fetti.tilt.cos);
    var y1 = fetti.position.y + (fetti.random * fetti.tilt.sin);
    var x2 = fetti.wabble.x + (fetti.random * fetti.tilt.cos);
    var y2 = fetti.wabble.y + (fetti.random * fetti.tilt.sin);
    fetti.opacity ?
        (context.fillStyle = 'rgba(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ', ' + (1 - fetti.progress) + ')') :
        (context.fillStyle = 'rgb(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ')');
    if (fetti.shape == 'ellipse')
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
        });
    if (fetti.shape == 'circle')
        createCircle({
            context: context,
            x: fetti.position.x,
            y: fetti.position.y,
            scale: fetti.scale,
        });
    if (fetti.shape == 'star')
        createStar({
            context: context,
            x: fetti.position.x,
            y: fetti.position.y,
            scale: fetti.scale
        });
    if (fetti.shape == 'emoji')
        createEmoji({
            context: context,
            emoji: fetti.emoji,
            x: fetti.position.x,
            y: fetti.position.y,
            size: fetti.scale
        });
    if (fetti.shape == 'square')
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
        });
};
/**
 * Render confetti
 *
 * @return {void}
 */
const renderConfetti = () => {
    const canvas = fettiGlobals ? fettiGlobals.canvas ? getCanvas(fettiGlobals.canvas) : getCanvas() : getCanvas();
    const context = canvas.getContext("2d");
    fettiGlobals ? fettiGlobals.z ? setCanvasZIndex(canvas.id, fettiGlobals.z) : '' : '';
    context.clearRect(0, 0, canvas.width, canvas.height);
    fettis.forEach((fetti) => {
        fetti.update();
        createConfettiShape(context, fetti);
    });
    fettis.forEach((fetti, index) => {
        if (fetti.position.x > canvas.width || fetti.position.x < 0)
            fettis.splice(index, 1);
        if (fetti.position.y > canvas.height || fetti.position.y < 0)
            fettis.splice(index, 1);
        if (fetti.progress >= 1)
            fettis.splice(index, 1);
    });
    window.requestAnimationFrame(renderConfetti);
};

if (!isSSR) {
    window.addEventListener('resize', () => { setCanvasWindowSize(); });
    window.requestAnimationFrame(renderConfetti);
}

exports.create = createConfetti;
