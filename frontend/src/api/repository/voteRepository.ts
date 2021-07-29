import apiGateway from '../apiGateway';
import { VoteType } from '../model/build';

class VoteRepositoryAPI {
    upvote = (b: number, token: string, previousVote?: VoteType) =>
        apiGateway.post<void, void>(
            `/builds/${b}/upvote?recaptcha=${token}${previousVote ? `&previousVote=${previousVote}` : ''}`,
        );
    downvote = (b: number, token: string, previousVote?: VoteType) =>
        apiGateway.post<void, void>(
            `/builds/${b}/downvote?recaptcha=${token}${previousVote ? `&previousVote=${previousVote}` : ''}`,
        );
}

const VoteRepository = new VoteRepositoryAPI();
export default VoteRepository;
