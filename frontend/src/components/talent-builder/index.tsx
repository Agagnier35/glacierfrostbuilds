import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PlayerClassRepository from '../../api/repository/playerClassRepository';
import { BuildContext } from '../../pages/create-build';
import TalentCard from '../talent-card';

interface TalentBuilderProps {
    selectedClass?: string;
}

const TalentBuilder = ({ selectedClass }: TalentBuilderProps) => {
    const { build, editBuild } = useContext(BuildContext);

    const { playerClass } = build;
/* eslint-disable */
    useEffect(() => {
        if (playerClass?.className) {
            PlayerClassRepository.getClassWithName(playerClass.className).then((pc) =>
                editBuild({ ...build, playerClass: pc }),
            );
        }
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
