import apiGateway from '../apiGateway';

class GameRepositoryAPI {
    getCurrentGameVersion = () => apiGateway.get<void, string>('/version');
}

const GameRepository = new GameRepositoryAPI();
export default GameRepository;
