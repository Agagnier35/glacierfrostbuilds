import React, { useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import BuildList from '../../api/model/build-list';
import Tags from '../../api/model/tags';
import BuildRepository from '../../api/repository/buildRepository';
import SearchForm from '../../components/search-form';
import SearchResultBuilds from '../search-result-build';

export interface SearchFormType {
    buildName: string;
    author: string;
    gameVersion: string;
    tags: Tags[];
    className: string;
    pageNumber: number;
    pageSize: number;
}

const SearchBuild = () => {
    const [activeKey, setActiveKey] = useState(0);

    const [buildResults, setBuildResults] = useState<BuildList>({ builds: [], numberOfBuild: 0, numberOfPages: 0 });

    const [searchForm, setSearchForm] = useState<SearchFormType>({
        buildName: '',
        author: '',
        gameVersion: '',
        tags: [],
        className: '',
        pageNumber: 0,
        pageSize: 10,
    });

    const search = async (s: SearchFormType) => {
        const res = await BuildRepository.search(s);
        setBuildResults(res);
        setActiveKey(1);
    };

    return (
        <Container fluid>
            <Accordion activeKey={activeKey.toString()}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header onClick={() => setActiveKey(0)}>Search</Accordion.Header>
                    <Accordion.Body>
                        <SearchForm searchForm={searchForm} setSearchForm={setSearchForm} search={search} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header onClick={() => setActiveKey(1)}>Results</Accordion.Header>
                    <Accordion.Body>
                        <SearchResultBuilds
                            searchForm={searchForm}
                            setSearchForm={setSearchForm}
                            search={search}
                            buildResults={buildResults}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};

export default SearchBuild;
