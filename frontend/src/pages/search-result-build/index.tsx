import React from 'react';
import { Badge, Col, Container, Figure, Pagination, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import BuildList from '../../api/model/build-list';
import getColorForTag from '../../components/tag-editor/tag-color';
import { CenterDiv } from '../create-build/style';
import { SearchFormType } from '../search-build';
import { TagContainer } from './style';

interface SearchResultBuildsProps {
    searchForm: SearchFormType;
    setSearchForm(s: SearchFormType): void;
    search(s: SearchFormType): void;
    buildResults: BuildList;
}

const SearchResultBuilds = ({ searchForm, setSearchForm, search, buildResults }: SearchResultBuildsProps) => {
    const history = useHistory();
    const navigateToPage = (page: number) => {
        const pageForm = { ...searchForm, pageNumber: page };
        setSearchForm(pageForm);
        search(pageForm);
    };

    const { pageNumber } = searchForm;
    const displayPage = pageNumber + 1;
    const maxPage = buildResults.numberOfPages - 1;
    const pageLeft = maxPage - pageNumber;

    return (
        <div>
            <h3>{buildResults.numberOfBuild} builds matching search.</h3>
            {buildResults.builds.map((b) => (
                <Container
                    fluid
                    key={b.buildId}
                    className="bg-primary rounded-1 my-2"
                    onClick={() => history.push(`/builds/${b.buildId}`)}
                >
                    <Row>
                        <Figure.Image
                            src={`./assets/classes/${b.playerClass.className}.png`}
                            style={{ maxWidth: '90px', maxHeight: '90px', objectFit: 'contain' }}
                        />
                        <Col className="px-3">
                            <Row as="h1" className="mb-0 px-3">
                                {b.buildName}
                            </Row>
                            <Row as="h5" className="mb-3 px-3">
                                By: {b.author}
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <TagContainer>
                                {b.tags.map((t) => (
                                    <Col
                                        as={Badge}
                                        key={t.tagId}
                                        pill
                                        bg={getColorForTag(t).bg}
                                        className="m-1"
                                        style={{ maxWidth: '100px' }}
                                    >
                                        {t.tagName}
                                    </Col>
                                ))}
                            </TagContainer>
                        </Col>
                    </Row>
                </Container>
            ))}

            <CenterDiv>
                <Pagination>
                    <Pagination.First onClick={() => navigateToPage(0)} />
                    <Pagination.Prev onClick={() => navigateToPage(pageNumber - 1)} disabled={pageNumber === 0} />

                    {pageNumber > 1 && (
                        <Pagination.Item onClick={() => navigateToPage(pageNumber - 2)}>
                            {displayPage - 2}
                        </Pagination.Item>
                    )}
                    {pageNumber > 0 && (
                        <Pagination.Item onClick={() => navigateToPage(pageNumber - 1)}>
                            {displayPage - 1}
                        </Pagination.Item>
                    )}

                    <Pagination.Item active>{displayPage}</Pagination.Item>

                    {pageLeft > 0 && (
                        <Pagination.Item onClick={() => navigateToPage(pageNumber + 1)}>
                            {displayPage + 1}
                        </Pagination.Item>
                    )}
                    {pageLeft > 1 && (
                        <Pagination.Item onClick={() => navigateToPage(pageNumber + 2)}>
                            {displayPage + 2}
                        </Pagination.Item>
                    )}

                    <Pagination.Next onClick={() => navigateToPage(pageNumber + 1)} disabled={pageNumber === maxPage} />
                    <Pagination.Last onClick={() => navigateToPage(maxPage)} />
                </Pagination>
            </CenterDiv>
        </div>
    );
};

export default SearchResultBuilds;
