import apiGateway from "../apiGateway";
import Tags from "../model/tags";

class TagsRepositoryAPI {
    getAllTags = () => apiGateway.get<void, Tags[]>('/tags');
}

const TagsRepository = new TagsRepositoryAPI();
export default TagsRepository;