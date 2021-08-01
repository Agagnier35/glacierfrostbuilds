import { Bubble } from './bubble';

export interface BuildBubbles {
    bubbleId: number;
    group: string;
    order: number;
    points?: number;
    bubble?: Bubble;
}
