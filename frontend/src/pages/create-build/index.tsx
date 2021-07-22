import React, { createContext, useState } from 'react';
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap';
import Build from '../../api/model/build';
import ClassSelector from '../../components/class-selector';
import TalentBuilder from '../../components/talent-builder';
import { CenterDiv } from './style';

interface BuildContextProps {
    build: Build;
    editBuild(b: Build): void;
}
export const BuildContext = createContext<BuildContextProps>({ build: {}, editBuild: () => {} });

const CreateBuild = () => {
    const [build, editBuild] = useState<Build>({});

    return (
        <BuildContext.Provider value={{ build, editBuild }}>
            <Container fluid>
                <Accordion defaultActiveKey="0" className="mb-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>General Information</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} lg={5}>
                                        <Form.Label htmlFor="BuildName">Build Name:</Form.Label>
                                        <Form.Control id="BuildName" size="sm" placeholder="Build name..." />
                                    </Form.Group>
                                    <Col></Col>
                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label htmlFor="GameVersion">Game Version:</Form.Label>
                                        <Form.Control id="GameVersion" size="sm" placeholder="Game Version..." />
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
                                        />
                                        <Form.Label htmlFor="MaxLevel">Recommended max level:</Form.Label>
                                        <Form.Control
                                            id="MaxLevel"
                                            size="sm"
                                            type="number"
                                            placeholder="Recommended max level..."
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <div>TODO: Tags</div>
                                </Row>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Class</Accordion.Header>
                        <Accordion.Body>
                            <ClassSelector />
                            <TalentBuilder />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <CenterDiv>
                    <Button variant="success" onClick={() => alert('TODO lol')}>
                        Publish!
                    </Button>
                </CenterDiv>
            </Container>
        </BuildContext.Provider>
    );
};

export default CreateBuild;
