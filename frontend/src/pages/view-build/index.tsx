import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button, Col, Figure, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buildDefaultBuild } from '../../api/model/build';
import BuildRepository from '../../api/repository/buildRepository';
import GameRepository from '../../api/repository/gameRepository';
import getColorForTag from '../../components/tag-editor/tag-color';
import TalentBuilder from '../../components/talent-builder';
import { AuthContext } from '../../utils/authProvider';
import { BuildContext } from '../create-build';
import { UpdateBuildButtonGroup } from './style';

const ViewBuild = () => {
    const { buildId } = useParams<{ buildId: string }>();

    const { auth } = useContext(AuthContext);

    const [build, setBuild] = useState(buildDefaultBuild());
    const [gameVersion, setGameVersion] = useState<string>();

    useEffect(() => {
        BuildRepository.getOneBuild(buildId)
            .then(setBuild)
            .catch((e) => {
                if (e.response.status === 404) {
                    toast.error('Build does not exist');
                }
            });
        GameRepository.getCurrentGameVersion().then(setGameVersion);
    }, [buildId]);

    return (
        <div className="p-2 m-3 bg-primary rounded-3">
            {!build.buildId ? (
                <Spinner animation="border" />
            ) : (
                <>
                    <Row>
                        <Figure.Image
                            src={`./assets/classes/${build.playerClass.className}.png`}
                            style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'contain' }}
                        />
                        <Col className="px-3">
                            <Row as="h1" className="mb-0 px-3">
                                {build.buildName}
                            </Row>
                            <Row as="h5" className="mb-3 px-3">
                                By: {build.author}
                            </Row>
                            <Row as="p" className="px-3">
                                {build.description}
                            </Row>
                        </Col>
                        <Col xs={12} md={3} lg={4}>
                            <Row as="h5" className="mb-3 px-3">
                                <Col className="px-0">Game Version: {build.gameVersion}</Col>
                                {auth?.user === build.author && build.gameVersion !== gameVersion && (
                                    <UpdateBuildButtonGroup className="px-0" size="sm">
                                        <Col as={Button} variant="success" onClick={() => alert('TODO')}>
                                            Update build to current version
                                        </Col>
                                        <Col as={Button} variant="danger" onClick={() => alert('TODO')}>
                                            Mark as deprecated
                                        </Col>
                                    </UpdateBuildButtonGroup>
                                )}
                            </Row>
                            <Row as="h5" className="mb-3 px-3">
                                Recommended Min Level: {build.minLevel}
                            </Row>
                            <Row as="h5" className="mb-3 px-3">
                                Recommended Max Level: {build.maxLevel}
                            </Row>
                            <Row className="mb-3 px-3">
                                {build.tags.map((t) => (
                                    <Col
                                        as={Badge}
                                        key={t.tagId}
                                        pill
                                        className="m-1"
                                        bg={getColorForTag(t).bg}
                                        style={{ maxWidth: '100px' }}
                                    >
                                        {t.tagName}
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <BuildContext.Provider value={{ build, editBuild: () => {}, editMode: false }}>
                            <TalentBuilder />
                        </BuildContext.Provider>
                    </Row>
                </>
            )}
        </div>
    );
};

export default ViewBuild;