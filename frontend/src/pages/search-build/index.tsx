import produce from 'immer';
import React, { useCallback, useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import { BuildList } from '../../api/model/build-list';
import { Tags } from '../../api/model/tags';
import BuildRepository from '../../api/repository/buildRepository';
import VoteRepository from '../../api/repository/voteRepository';
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
    sortBy: 'upvotes' | 'timestampCreation';
    sortDir: 'ASC' | 'DESC';
}

const SearchBuild = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

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
        sortBy: 'upvotes',
        sortDir: 'DESC',
    });

    const search = async (s: SearchFormType) => {
        const res = await BuildRepository.search(s);
        setBuildResults(res);
        setActiveKey(1);
    };

    const upvote = useCallback(
        async (b: number) => {
            const token = await executeRecaptcha?.('upvote_build');

            if (token) {
                await VoteRepository.upvote(b, token, buildResults.builds.find((bu) => bu.buildId === b)?.userVote);
                setBuildResults(
                    produce(buildResults, (draft) => {
                        const votedBuild = draft.builds.find((bu) => bu.buildId === b);
                        if (votedBuild) {
                            switch (votedBuild.userVote) {
                                case 'DOWNVOTE':
                                    votedBuild.upvotes += 2;
                                    break;
                                case 'UPVOTE':
                                    votedBuild.upvotes -= 1;
                                    votedBuild.userVote = undefined;
                                    return;
                                default:
                                    votedBuild.upvotes += 1;
                                    break;
                            }
                            votedBuild.userVote = 'UPVOTE';
                        }
                    }),
                );
            } else {
                toast.error('reCAPTCHA Failed');
            }
        },
        [buildResults, executeRecaptcha],
    );

    const downvote = useCallback(
        async (b: number) => {
            const token = await executeRecaptcha?.('downvote_build');

            if (token) {
                await VoteRepository.downvote(b, token, buildResults.builds.find((bu) => bu.buildId === b)?.userVote);
                setBuildResults(
                    produce(buildResults, (draft) => {
                        const votedBuild = draft.builds.find((bu) => bu.buildId === b);
                        if (votedBuild) {
                            switch (votedBuild.userVote) {
                                case 'DOWNVOTE':
                                    votedBuild.upvotes += 1;
                                    votedBuild.userVote = undefined;
                                    return;
                                case 'UPVOTE':
                                    votedBuild.upvotes -= 2;
                                    break;
                                default:
                                    votedBuild.upvotes -= 1;
                                    break;
                            }
                            votedBuild.userVote = 'DOWNVOTE';
                        }
                    }),
                );
            } else {
                toast.error('reCAPTCHA Failed');
            }
        },
        [buildResults, executeRecaptcha],
    );

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
                            upvote={upvote}
                            downvote={downvote}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};

export default SearchBuild;
