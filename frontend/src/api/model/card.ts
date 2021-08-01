import { CardCategory } from './card-category';

export interface Card {
    cardId: number;
    name: string;
    effect: string;
    category: CardCategory;
    hide: boolean;
}
