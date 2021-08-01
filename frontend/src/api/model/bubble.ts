export interface Bubble {
    bubbleId: number;
    name: string;
    effect: string;
    bubbleNumber: number;
    category: string;
    hide?: boolean;
}

export const BubbleCategories = ['Orange', 'Green', 'Purple', 'Yellow'];
