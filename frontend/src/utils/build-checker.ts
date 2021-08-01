import { createCheckers } from 'ts-interface-checker';
import BubbleValidator from '../api/model/validators/bubble-ti';
import BuildBubblesValidator from '../api/model/validators/build-bubbles-ti';
import BuildCardsValidator from '../api/model/validators/build-cards-ti';
import BuildTalentsValidator from '../api/model/validators/build-talents-ti';
import BuildValidator from '../api/model/validators/build-ti';
import CardCategoryValidator from '../api/model/validators/card-category-ti';
import CardValidator from '../api/model/validators/card-ti';
import PlayerClassValidator from '../api/model/validators/player-class-ti';
import TagsValidator from '../api/model/validators/tags-ti';
import TalentsValidator from '../api/model/validators/talents-ti';

const { Build } = createCheckers(
    BuildValidator,
    BuildTalentsValidator,
    PlayerClassValidator,
    TagsValidator,
    TalentsValidator,
    BuildCardsValidator,
    BuildBubblesValidator,
    CardCategoryValidator,
    CardValidator,
    BubbleValidator,
);

export { Build as BuildChecker };
