/*
 *
 *  🎉 Confettis v0.1.1
 *  https://github.com/ovniroto/confettis
 *
 *  (c) 2023 Lucas O. S.
 *  Confettis may be freely distributed under the MIT license.
 *
*/

type Shapes = 'square' | 'ellipse' | 'circle' | 'star' | 'emoji';
type ConfettiProps = {
    canvas?: string;
    count?: number;
    gravity?: number;
    drag?: number;
    ticks?: number;
    decay?: number;
    drift?: number;
    angle?: number;
    spread?: number;
    velocity?: number;
    scales?: number[];
    x?: number;
    y?: number;
    z?: number;
    shapes?: Shapes[];
    colors?: string[];
    emojis?: string[];
};

/**
 * Create confetti
 *
 * @return {void}
 */
declare const createConfetti: (props?: ConfettiProps) => void;

export { createConfetti as create };
