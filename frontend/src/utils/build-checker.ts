import { createCheckers } from 'ts-interface-checker';
import BuildTalentsValidator from '../api/model/validators/build-talents-ti';
import BuildValidator from '../api/model/validators/build-ti';
import PlayerClassValidator from '../api/model/validators/player-class-ti';
import TagsValidator from '../api/model/validators/tags-ti';
import TalentsValidator from '../api/model/validators/talents-ti';

const { Build } = createCheckers(
    BuildValidator,
    BuildTalentsValidator,
    PlayerClassValidator,
    TagsValidator,
    TalentsValidator,
);

export { Build as BuildChecker };
