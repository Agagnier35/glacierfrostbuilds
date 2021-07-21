import apiGateway from '../apiGateway';
import PlayerClass from '../model/player-class';

class PlayerClassRepositoryAPI {
    getPlayerClassNames = () => apiGateway.get<void, string[]>('/classes');
    getClassWithName = (name: string) => apiGateway.get<void, PlayerClass>(`/classes/${name}`);
}

const PlayerClassRepository = new PlayerClassRepositoryAPI();
export default PlayerClassRepository;
