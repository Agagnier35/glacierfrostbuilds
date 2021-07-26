import apiGateway from '../apiGateway';

class VoteRepositoryAPI {
    upvote = (b: number) => apiGateway.post<void, void>(`/builds/${b}/upvote`);
    downvote = (b: number) => apiGateway.post<void, void>(`/builds/${b}/downvote`);
}

const VoteRepository = new VoteRepositoryAPI();
export default VoteRepository;
