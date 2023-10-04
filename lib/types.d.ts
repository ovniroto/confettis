/*
 *
 *  🎉 Confettis v0.3.0
 *  https://github.com/ovniroto/confettis
 *
 *  (c) 2023 Lucas O. S.
 *  Confettis may be freely distributed under the MIT license.
 *
*/

type Shapes = 'square' | 'rectangle' | 'ellipse' | 'circle' | 'star' | 'emoji';
type ConfettiProps = {
    x?: number;
    y?: number;
    z?: number;
    canvas?: string;
    count?: number;
    gravity?: number | number[];
    ticks?: number | number[];
    speed?: number | number[];
    scale?: number | number[];
    overflow?: {
        left?: boolean;
        right?: boolean;
        top?: boolean;
        bottom?: boolean;
    };
    decay?: number;
    drift?: number;
    angle?: number;
    spread?: number;
    quiet?: boolean;
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
