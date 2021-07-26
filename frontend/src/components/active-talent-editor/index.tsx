import produce from 'immer';
import React, { ChangeEvent, useContext } from 'react';
import { Col, Container, Figure, Form, Row } from 'react-bootstrap';
import Talents from '../../api/model/talents';
import { BuildContext } from '../../pages/create-build';
import NumberPicker from '../number-picker';
import { OneTalentContainer } from '../talent-selector/style';
import { TalentContainer } from './style';

interface ActiveTalentProps {
    activeTalent: Talents;
}

const ActiveTalentEditor = ({ activeTalent }: ActiveTalentProps) => {
    const { build, editBuild, editMode } = useContext(BuildContext);

    const talentPoints = build.talents?.find((t) => t.talentId === activeTalent.talentId)?.points ?? 0;
    const talentComments = build.talents?.find((t) => t.talentId === activeTalent.talentId)?.comments ?? '';

    const changeBuildTalent = (eventType: 'comment' | 'point', e: number | string) =>
        editBuild(
            produce(build, (draft) => {
                const newComment = eventType === 'comment' ? (e as string) : talentComments;
                const newPoints = eventType === 'point' ? (e as number) : talentPoints;
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
                <OneTalentContainer>
                    <Figure.Image
                        width={80}
                        height={80}
                        src={`./assets/talents/${activeTalent.className}/${activeTalent.displayTab}-${
                            activeTalent.displayOrder + 1
                        }.png`}
                    />
                </OneTalentContainer>
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
                            {editMode ? (
                                <Form.Control
                                    style={{ resize: 'none' }}
                                    as="textarea"
                                    rows={2}
                                    size="sm"
                                    placeholder="Comments ..."
                                    value={talentComments}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        changeBuildTalent('comment', e.target.value)
                                    }
                                />
                            ) : (
                                <h5 className="text-danger">{talentComments}</h5>
                            )}
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <NumberPicker
                        value={talentPoints}
                        onChange={(n) => changeBuildTalent('point', n)}
                        canEditValue={editMode}
                        renderButtons={editMode}
                    />
                </Col>
            </Row>
        </TalentContainer>
    );
};

export default ActiveTalentEditor;
