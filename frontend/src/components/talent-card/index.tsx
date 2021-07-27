import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Talents } from '../../api/model/talents';
import { BuildContext } from '../../pages/create-build';
import ActiveTalentEditor from '../active-talent-editor';
import TalentSelector from '../talent-selector';

interface TalentCardProps {
    talents: Talents[];
}

const TalentCard = ({ talents }: TalentCardProps) => {
    const { build } = useContext(BuildContext);

    const [activeTalent, setActiveTalent] = useState<Talents>();

    useEffect(() => {
        setActiveTalent(undefined);
    }, [build.playerClass?.className]);

    const assignTalent = (t: Talents) => (
        <TalentSelector key={t.talentId} talent={t} setActiveTalent={setActiveTalent} />
    );

    talents.sort((a, b) => a.displayOrder - b.displayOrder);
    return (
        <Card key={talents[0].displayTab}>
            <Card.Body>
                <Container style={{ padding: 0 }}>
                    <Row xs={5}>{talents.slice(0, 5).map(assignTalent)}</Row>
                    <Row xs={5}>{talents.slice(5, 10).map(assignTalent)}</Row>
                    <Row xs={5}>{talents.slice(10, 15).map(assignTalent)}</Row>
                </Container>
            </Card.Body>
            {activeTalent && (
                <Card.Footer style={{ padding: '0.5rem 0.1rem' }}>
                    <ActiveTalentEditor activeTalent={activeTalent} />
                </Card.Footer>
            )}
        </Card>
    );
};

export default TalentCard;
