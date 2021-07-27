import apiGateway from '../apiGateway';

class GameRepositoryAPI {
    getQuote = () => apiGateway.get<void, string>('/quote');
    getCurrentGameVersion = () => apiGateway.get<void, string>('/version');
}

const GameRepository = new GameRepositoryAPI();
export default GameRepository;
