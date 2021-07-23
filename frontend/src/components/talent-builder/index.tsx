import produce from 'immer';
import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PlayerClassRepository from '../../api/repository/playerClassRepository';
import { BuildContext } from '../../pages/create-build';
import TalentCard from '../talent-card';

const TalentBuilder = () => {
    const { build, editBuild } = useContext(BuildContext);

    const { playerClass } = build;

    useEffect(() => {
        if (playerClass?.className) {
            PlayerClassRepository.getClassWithName(playerClass.className).then((pc) =>
                editBuild(
                    produce(build, (draft) => {
                        draft.playerClass = pc;
                    }),
                ),
            );
        }
        /* eslint-disable */
    }, [playerClass?.className, editBuild]);
    /* eslint-enable */

    if (playerClass) {
        const numberOfTabs = Math.max(...playerClass.talents.map((t) => t.displayTab));

        const talentCards = [];
        for (let i = 0; i <= numberOfTabs; i++) {
            talentCards.push(
                <Col key={i}>
                    <TalentCard talents={playerClass.talents.filter((t) => t.displayTab === i)} />
                </Col>,
            );
        }

        return (
            <Container fluid>
                <Row lg={3} xs={1}>
                    {talentCards}
                </Row>
            </Container>
        );
    }
    return null;
};

export default TalentBuilder;
