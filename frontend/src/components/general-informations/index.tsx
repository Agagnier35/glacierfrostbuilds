import produce, { Draft } from 'immer';
import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Build from '../../api/model/build';
import { BuildContext } from '../../pages/create-build';
import TagEditor from '../tag-editor';

const GeneralInformation = () => {
    const { build, editBuild } = useContext(BuildContext);

    const changeBuild = (recipe: (draft: Draft<Build>) => void) => editBuild(produce(build, recipe));

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} lg={5}>
                    <Form.Label htmlFor="BuildName">Build Name:</Form.Label>
                    <Form.Control
                        id="BuildName"
                        size="sm"
                        placeholder="Build name..."
                        value={build.buildName}
                        onChange={(e) =>
                            changeBuild((draft) => {
                                draft.buildName = e.target.value;
                            })
                        }
                    />
                </Form.Group>
                <Col></Col>
                <Form.Group as={Col} lg={3}>
                    <Form.Label htmlFor="GameVersion">Game Version:</Form.Label>
                    <Form.Control
                        id="GameVersion"
                        size="sm"
                        placeholder="Game Version..."
                        value={build.gameVersion}
                        onChange={(e) =>
                            changeBuild((draft) => {
                                draft.gameVersion = e.target.value;
                            })
                        }
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} lg={5}>
                    <Form.Label htmlFor="DescriptionField">Description:</Form.Label>
                    <Form.Control
                        id="DescriptionField"
                        style={{ resize: 'none' }}
                        as="textarea"
                        rows={5}
                        size="sm"
                        placeholder="Description..."
                        value={build.description}
                        onChange={(e) =>
                            changeBuild((draft) => {
                                draft.description = e.target.value;
                            })
                        }
                    />
                </Form.Group>
                <Col></Col>
                <Form.Group as={Col} lg={3}>
                    <Form.Label htmlFor="MinLevel">Recommended min level:</Form.Label>
                    <Form.Control
                        id="MinLevel"
                        size="sm"
                        type="number"
                        className="mb-3"
                        placeholder="Recommended min level..."
                        value={build.minLevel}
                        onChange={(e) =>
                            changeBuild((draft) => {
                                const min = parseInt(e.target.value);
                                if (min >= 0) {
                                    draft.minLevel = min;
                                }
                            })
                        }
                    />
                    <Form.Label htmlFor="MaxLevel">Recommended max level:</Form.Label>
                    <Form.Control
                        id="MaxLevel"
                        size="sm"
                        type="number"
                        placeholder="Recommended max level..."
                        value={build.maxLevel}
                        onChange={(e) =>
                            changeBuild((draft) => {
                                const min = parseInt(e.target.value);
                                if (min >= 0) {
                                    draft.maxLevel = min;
                                }
                            })
                        }
                    />
                </Form.Group>
            </Row>
            <Row>
                <TagEditor />
            </Row>
        </Form>
    );
};

export default GeneralInformation;
