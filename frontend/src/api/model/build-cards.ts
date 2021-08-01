import { Card } from './card';

export interface BuildCards {
    cardId: number;
    card?: Card;
    group: string;
    order: number;
}
export const BuildCardGroups = ['Core', 'Useful', 'Minimal'];
