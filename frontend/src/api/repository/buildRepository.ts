import { SearchFormType } from '../../pages/search-build';
import apiGateway from '../apiGateway';
import Build from '../model/build';
import BuildList from '../model/build-list';

class BuildRepositoryAPI {
    search = (searchForm: SearchFormType) =>
        apiGateway.get<void, BuildList>(
            `/builds?pageNumber=${searchForm.pageNumber}&pageSize=${searchForm.pageSize}${
                searchForm.sortBy ? `&sortBy=${searchForm.sortBy}` : ''
            }${searchForm.sortDir ? `&sortDirection=${searchForm.sortDir}` : ''}${
                searchForm.buildName ? `&buildName=${searchForm.buildName}` : ''
            }${searchForm.author ? `&author=${searchForm.author}` : ''}${
                searchForm.className ? `&className=${searchForm.className}` : ''
            }${searchForm.gameVersion ? `&gameVersion=${searchForm.gameVersion}` : ''}${
                searchForm.tags.length > 0 ? `&tags=${searchForm.tags.map((t) => t.tagId).join(',')}` : ''
            }`,
        );
    getOneBuild = (buildId: string) => apiGateway.get<void, Build>(`/builds/${buildId}`);
    getBuildCount = () => apiGateway.get<void, number>(`/builds/count`);
    postBuild = (b: Build) => apiGateway.post<Build, Build>('/builds', b);
}

const BuildRepository = new BuildRepositoryAPI();
export default BuildRepository;
