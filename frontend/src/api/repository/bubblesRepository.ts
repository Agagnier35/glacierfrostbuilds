import apiGateway from '../apiGateway';
import { Bubble } from '../model/bubble';

class BubblesRepositoryAPI {
    getAllBubbles = () => apiGateway.get<void, Bubble[]>('/bubbles');
}

const BubblesRepository = new BubblesRepositoryAPI();
export default BubblesRepository;
