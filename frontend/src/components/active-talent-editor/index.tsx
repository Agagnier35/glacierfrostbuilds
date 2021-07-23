import produce from 'immer';
import React, { ChangeEvent, useContext } from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import Talents from '../../api/model/talents';
import { BuildContext } from '../../pages/create-build';
import { TalentContainer } from './style';

interface ActiveTalentProps {
    activeTalent: Talents;
}

const ActiveTalentEditor = ({ activeTalent }: ActiveTalentProps) => {
    const { build, editBuild } = useContext(BuildContext);

    const talentPoints = build.talents?.find((t) => t.talentId === activeTalent.talentId)?.points ?? 0;
    const talentComments = build.talents?.find((t) => t.talentId === activeTalent.talentId)?.comments ?? '';

    const changeBuildTalent = (
        eventType: 'comment' | 'point',
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
        editBuild(
            produce(build, (draft) => {
                const newComment = eventType === 'comment' ? e.target.value : talentComments;
                const newPoints = eventType === 'point' ? parseInt(e.target.value) : talentPoints;
                if (!draft.talents) {
                    draft.talents = [];
                }

                if (newPoints <= 0 && !newComment) {
                    draft.talents = draft.talents.filter((t) => t.talentId !== activeTalent.talentId);
                } else {
                    const index = draft.talents.findIndex((t) => t.talentId === activeTalent.talentId);
                    if (index === -1) {
                        draft.talents.push({
                            talentId: activeTalent.talentId,
                            points: newPoints,
                            comments: newComment,
                        });
                    } else {
                        draft.talents[index].points = newPoints;
                        draft.talents[index].comments = newComment;
                    }
                }
            }),
        );

    return (
        <TalentContainer fluid>
            <Row style={{ alignItems: 'center' }}>
                <Col>
                    <Image
                        src={`assets/talents/${activeTalent.className}/${activeTalent.displayTab}-${
                            activeTalent.displayOrder + 1
                        }.png`}
                        fluid
                    />
                </Col>
                <Col xs={8}>
                    <Container>
                        <Row>
                            <p>
                                <b>{activeTalent.talentName}</b>
                            </p>
                        </Row>
                        <Row>
                            <p>{activeTalent.description}</p>
                        </Row>
                        <Row>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Comments ..."
                                value={talentComments}
                                onChange={(e) => changeBuildTalent('comment', e)}
                            />
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Form.Control
                        size="sm"
                        type="number"
                        placeholder="0"
                        value={talentPoints}
                        onChange={(e) => changeBuildTalent('point', e)}
                    />
                </Col>
            </Row>
        </TalentContainer>
    );
};

export default ActiveTalentEditor;
