import apiGateway from '../apiGateway';
import Build from '../model/build';

class BuildRepositoryAPI {
    postBuild = (b: Build) => apiGateway.post<Build, Build>('/builds', b);
}

const BuildRepository = new BuildRepositoryAPI();
export default BuildRepository;
