import BuildTalents from './build-talents';
import PlayerClass from './player-class';
import Tags from './tags';

export default interface Build {
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
}

export const buildDefaultBuild = (): Build => ({
    buildName: '',
    description: '',
    author: '',
    upvotes: 0,
    gameVersion: '',
    talents: [],
    playerClass: {
        className: '',
        talents: [],
    },
    tags: [],
});
