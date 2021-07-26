import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Figure, Row } from 'react-bootstrap';
import PlayerClassRepository from '../../api/repository/playerClassRepository';
import { BuildContext } from '../../pages/create-build';

const ClassSelector = () => {
    const [classes, setClasses] = useState<string[]>([]);

    const { build, editBuild } = useContext(BuildContext);

    useEffect(() => {
        PlayerClassRepository.getPlayerClassNames().then(setClasses);
    }, []);

    return (
        <Container fluid className="mb-3">
            <Row md={6} sm={3} xs={3}>
                {classes.map((c) => (
                    <Col
                        key={c}
                        as={Button}
                        variant={`${c === build?.playerClass?.className ? 'secondary' : 'outline-primary'}`}
                        onClick={() =>
                            editBuild(
                                produce(build, (draft) => {
                                    draft.playerClass = { className: c, talents: [] };
                                }),
                            )
                        }
                    >
                        <Figure.Image
                            src={`./assets/classes/${c}.png`}
                            style={{ maxWidth: '90px', maxHeight: '90px', objectFit: 'contain' }}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ClassSelector;
