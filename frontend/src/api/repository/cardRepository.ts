import apiGateway from '../apiGateway';
import { Card } from '../model/card';
import { CardCategory } from '../model/card-category';

class CardsRepositoryAPI {
    getAllCards = () => apiGateway.get<void, Card[]>('/cards');
    getAllCardsCategory = () => apiGateway.get<void, CardCategory[]>('/cards/categories');
}

const CardsRepository = new CardsRepositoryAPI();
export default CardsRepository;
