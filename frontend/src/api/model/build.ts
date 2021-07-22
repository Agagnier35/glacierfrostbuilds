import BuildTalents from './build-talents';
import PlayerClass from './player-class';
import Tags from './tags';

export default interface Build {
    buildId?: number;
    buildName?: string;
    description?: string;
    author?: string;
    upvotes?: number;
    gameVersion?: string;
    minLevel?: string;
    maxLevel?: string;
    talents?: BuildTalents[];
    playerClass?: PlayerClass;
    tags?: Tags[];
}
