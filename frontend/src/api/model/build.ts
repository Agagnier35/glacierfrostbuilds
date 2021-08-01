import { BuildBubbles } from './build-bubbles';
import { BuildCards } from './build-cards';
import { BuildTalents } from './build-talents';
import { CardCategory } from './card-category';
import { PlayerClass } from './player-class';
import { Tags } from './tags';

export type VoteType = 'UPVOTE' | 'DOWNVOTE';
export interface Build {
    buildId?: number;
    buildName: string;
    description: string;
    author: string;
    upvotes: number;
    gameVersion: string;
    minLevel?: number;
    maxLevel?: number;
    deprecated: boolean;
    cardSet?: CardCategory;
    talents: BuildTalents[];
    cards: BuildCards[];
    bubbles: BuildBubbles[];
    playerClass: PlayerClass;
    tags: Tags[];
    userVote?: VoteType;
}

export const buildDefaultBuild = (author?: string): Build => ({
    buildName: '',
    description: '',
    author: author ?? '<anonymous>',
    upvotes: 0,
    gameVersion: '',
    talents: [],
    cards: [],
    bubbles: [],
    deprecated: false,
    playerClass: {
        className: '',
        talents: [],
    },
    tags: [],
});
