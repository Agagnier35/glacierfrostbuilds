import { BuildTalents } from './build-talents';
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
    talents: BuildTalents[];
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
    playerClass: {
        className: '',
        talents: [],
    },
    tags: [],
});
