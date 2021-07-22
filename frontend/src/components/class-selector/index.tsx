import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
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
                        active={c === build?.playerClass?.className}
                        onClick={() =>
                            editBuild(
                                produce(build, (draft) => {
                                    if (!draft?.playerClass) {
                                        draft.playerClass = { className: c, talents: [] };
                                    }
                                    draft.playerClass.className = c;
                                    draft.talents = [];
                                }),
                            )
                        }
                    >
                        <Image src={`assets/${c}.png`} fluid />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ClassSelector;
