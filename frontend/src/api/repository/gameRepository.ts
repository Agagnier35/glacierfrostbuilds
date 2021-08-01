import apiGateway from '../apiGateway';

class GameRepositoryAPI {
    getQuote = () => apiGateway.get<void, string>('/quote');
    getCurrentGameVersion = () => apiGateway.get<void, string>('/version').then((g) => g.toString());
}

const GameRepository = new GameRepositoryAPI();
export default GameRepository;
