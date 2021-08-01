import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Col, Figure, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Tags } from '../../api/model/tags';
import PlayerClassRepository from '../../api/repository/playerClassRepository';
import TagsRepository from '../../api/repository/tagsRepository';
import getColorForTag from '../../components/tag-editor/tag-color';
import { CenterDiv } from '../../pages/create-build/style';
import { SearchFormType } from '../../pages/search-build';

interface SearchFormProps {
    searchForm: SearchFormType;
    setSearchForm(s: SearchFormType): void;
    search(s: SearchFormType): void;
}

const SearchForm = ({ searchForm, setSearchForm, search }: SearchFormProps) => {
    const [tags, setTags] = useState<Tags[]>([]);
    const [classes, setClasses] = useState<string[]>([]);

    useEffect(() => {
        //GameRepository.getCurrentGameVersion().then((g) => setSearchForm({ ...searchForm, gameVersion: g }));
        TagsRepository.getAllTags().then(setTags);
        PlayerClassRepository.getPlayerClassNames().then(setClasses);
        /* eslint-disable */
    }, []);
    /* eslint-enable */

    return (
        <Form>
            <Row className="mb-3">
                <Col as={FloatingLabel} label="Build name contains..." md={4} className="mb-1">
                    <Form.Control
                        type="text"
                        placeholder="Build name contains..."
                        value={searchForm.buildName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearchForm({ ...searchForm, buildName: e.target.value })
                        }
                    />
                </Col>
                <Col as={FloatingLabel} label="Author name contains..." md={4} className="mb-1">
                    <Form.Control
                        type="text"
                        placeholder="Author name contains..."
                        value={searchForm.author}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearchForm({ ...searchForm, author: e.target.value })
                        }
                    />
                </Col>
                <Col as={FloatingLabel} label="Game Version equals..." md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Game Version equals..."
                        value={searchForm.gameVersion}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearchForm({ ...searchForm, gameVersion: e.target.value })
                        }
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <h5>Class:</h5>
                <ButtonGroup className="flex-wrap">
                    {classes.map((c) => {
                        const isActive = searchForm.className === c;
                        return (
                            <Button
                                key={c}
                                size="sm"
                                variant={`${isActive ? 'secondary' : 'outline-primary'}`}
                                onClick={() =>
                                    setSearchForm({
                                        ...searchForm,
                                        className: isActive ? '' : c,
                                    })
                                }
                            >
                                <Figure.Image
                                    src={`./assets/classes/${c}.png`}
                                    style={{
                                        maxWidth: '90px',
                                        maxHeight: '90px',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </Row>
            <Row className="mb-3">
                <h5>Tags:</h5>
                <ButtonGroup className="flex-wrap">
                    {tags.map((t) => {
                        const isActive = searchForm.tags.find((st) => st.tagId === t.tagId);
                        return (
                            <Button
                                key={t.tagId}
                                size="sm"
                                variant={`${isActive ? '' : 'outline-'}${getColorForTag(t).bg}`}
                                onClick={() =>
                                    setSearchForm({
                                        ...searchForm,
                                        tags: isActive
                                            ? searchForm.tags.filter((st) => st.tagId !== t.tagId)
                                            : [...searchForm.tags, t],
                                    })
                                }
                            >
                                {t.tagName}
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </Row>
            <Row>
                <h5>Sort:</h5>
                <ButtonToolbar className="flex-wrap">
                    <ButtonGroup className="me-2">
                        <Button
                            variant={`${searchForm.sortBy === 'upvotes' ? 'secondary' : 'outline-primary'}`}
                            onClick={() =>
                                setSearchForm({
                                    ...searchForm,
                                    sortBy: 'upvotes',
                                })
                            }
                        >
                            Upvotes
                        </Button>
                        <Button
                            variant={`${searchForm.sortBy === 'timestampCreation' ? 'secondary' : 'outline-primary'}`}
                            onClick={() =>
                                setSearchForm({
                                    ...searchForm,
                                    sortBy: 'timestampCreation',
                                })
                            }
                        >
                            Creation Date
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-2">
                        <Button
                            variant={`${searchForm.sortDir === 'ASC' ? 'secondary' : 'outline-primary'}`}
                            onClick={() =>
                                setSearchForm({
                                    ...searchForm,
                                    sortDir: 'ASC',
                                })
                            }
                        >
                            Ascending
                        </Button>
                        <Button
                            variant={`${searchForm.sortDir === 'DESC' ? 'secondary' : 'outline-primary'}`}
                            onClick={() =>
                                setSearchForm({
                                    ...searchForm,
                                    sortDir: 'DESC',
                                })
                            }
                        >
                            Descending
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
            <CenterDiv>
                <Button
                    variant="success"
                    className="mt-3"
                    style={{ textAlign: 'center' }}
                    onClick={() => search(searchForm)}
                >
                    Search!
                </Button>
            </CenterDiv>
        </Form>
    );
};

export default SearchForm;
