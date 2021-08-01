import produce from 'immer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Container, Figure, Form, OverlayTrigger, Popover, Row, Spinner } from 'react-bootstrap';
import { Bubble, BubbleCategories } from '../../api/model/bubble';
import { BuildBubbles } from '../../api/model/build-bubbles';
import { BuildCardGroups } from '../../api/model/build-cards';
import BubblesRepository from '../../api/repository/bubblesRepository';
import { BuildContext } from '../../pages/create-build';
import { GroupLabel } from '../card-editor/style';
import { BubbleContainer, BubbleItem, BuildBubbleContainer } from './style';

const BubbleEditor = () => {
    const { build, editBuild } = useContext(BuildContext);

    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    useEffect(() => {
        BubblesRepository.getAllBubbles().then(setBubbles);
    }, []);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { source, destination, draggableId } = result;
            const bubbleId = parseInt(draggableId);
            // dropped outside the list
            if (!destination) {
                return;
            }
            if (source.droppableId === destination.droppableId && BuildCardGroups.includes(destination.droppableId)) {
                editBuild(
                    produce(build, (draft) => {
                        draft.bubbles.forEach((bubble) => {
                            if (source.index < destination.index) {
                                if (bubble.order > source.index && bubble.order <= destination.index) {
                                    if (source.index < destination.index) {
                                        bubble.order--;
                                    }
                                }
                            } else {
                                if (bubble.order >= destination.index && bubble.order < source.index) {
                                    bubble.order++;
                                }
                            }
                        });
                        draft.bubbles.find((bubble) => bubble.bubbleId === bubbleId)!.order = destination.index;
                    }),
                );
            } else {
                if (BuildCardGroups.includes(destination.droppableId)) {
                    editBuild(
                        produce(build, (draft) => {
                            draft.bubbles
                                .filter(
                                    (bubble) =>
                                        bubble.group === destination.droppableId && bubble.order >= destination.index,
                                )
                                .forEach((card) => card.order++);
                            draft.bubbles.splice(destination.index, 0, {
                                bubbleId,
                                group: destination.droppableId,
                                order: destination.index,
                            });
                        }),
                    );
                    setBubbles(
                        bubbles.map((b) => {
                            if (b.bubbleId === bubbleId) {
                                b.hide = true;
                            }
                            return b;
                        }),
                    );
                } else if (BuildCardGroups.includes(source.droppableId)) {
                    editBuild(
                        produce(build, (draft) => {
                            draft.bubbles = draft.bubbles.filter((b) => b.bubbleId !== bubbleId);
                        }),
                    );
                    setBubbles(
                        bubbles.map((b) => {
                            if (b.bubbleId === bubbleId) {
                                b.hide = false;
                            }
                            return b;
                        }),
                    );
                }
            }
        },
        [build, editBuild, bubbles],
    );

    const bubbleCategory: Bubble[][] = [];
    BubbleCategories.forEach((bc) =>
        bubbleCategory.push(
            bubbles.filter((b) => b.category === bc).sort((b1, b2) => b2.bubbleNumber - b1.bubbleNumber),
        ),
    );

    const buildBubblesGroups: { [groupId: string]: BuildBubbles[] } = {};
    BuildCardGroups.forEach(
        (g) =>
            (buildBubblesGroups[g] = build.bubbles.filter((b) => b.group === g).sort((b1, b2) => b1.order - b2.order)),
    );

    return bubbles.length === 0 ? (
        <Spinner animation="border" />
    ) : (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => window.navigator.vibrate?.(100)}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Object.entries(buildBubblesGroups).map(([g, bubbleBuild]) => (
                    <Droppable key={g} droppableId={g} direction="horizontal">
                        {(provided, snapshot) => (
                            <BuildBubbleContainer ref={provided.innerRef} isDragging={snapshot.isDraggingOver}>
                                <GroupLabel>{g}</GroupLabel>
                                {bubbleBuild.map((b, index) => (
                                    <Draggable key={b.bubbleId} draggableId={b.bubbleId.toString()} index={index}>
                                        {(provided, snapshot) => {
                                            const bubble = bubbles.find((bb) => b.bubbleId === bb.bubbleId);
                                            return (
                                                <BubbleItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    isDragging={snapshot.isDragging}
                                                    style={provided.draggableProps.style}
                                                >
                                                    <Figure.Image
                                                        width={56}
                                                        height={56}
                                                        src={`./assets/alchemy/${bubble?.category}${bubble?.bubbleNumber}.png`}
                                                        alt={bubble?.name}
                                                    />
                                                    <Form.Control
                                                        size="sm"
                                                        type="number"
                                                        value={b.points}
                                                        onChange={(e) =>
                                                            editBuild(
                                                                produce(build, (draft) => {
                                                                    const p = parseInt(e.target.value);
                                                                    if (!isNaN(p) && p >= 0 && p <= 1000) {
                                                                        draft.bubbles.find(
                                                                            (db) => db.bubbleId === b.bubbleId,
                                                                        )!.points = p;
                                                                    }
                                                                }),
                                                            )
                                                        }
                                                    />
                                                </BubbleItem>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </BuildBubbleContainer>
                        )}
                    </Droppable>
                ))}
            </div>
            <br />
            <Container>
                <Row>
                    {bubbleCategory.map((bb) => (
                        <Droppable key={bb[0].category} droppableId={bb[0].category}>
                            {(provided, snapshot) => (
                                <BubbleContainer ref={provided.innerRef} isDragging={snapshot.isDraggingOver}>
                                    {bb.map((b, index) =>
                                        !b.hide ? (
                                            <Draggable
                                                key={b.bubbleId}
                                                draggableId={b.bubbleId.toString()}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <BubbleItem
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        isDragging={snapshot.isDragging}
                                                        style={provided.draggableProps.style}
                                                    >
                                                        <OverlayTrigger
                                                            key={`triger-${b.bubbleId}`}
                                                            placement="top"
                                                            overlay={
                                                                <Popover id={`tooltip-${b.bubbleId}`}>
                                                                    <Popover.Header>{b.name}</Popover.Header>
                                                                    <Popover.Body>{b.effect}</Popover.Body>
                                                                </Popover>
                                                            }
                                                        >
                                                            <Figure.Image
                                                                width={56}
                                                                height={56}
                                                                src={`./assets/alchemy/${b.category}${b.bubbleNumber}.png`}
                                                                alt={b.name}
                                                            />
                                                        </OverlayTrigger>
                                                    </BubbleItem>
                                                )}
                                            </Draggable>
                                        ) : null,
                                    )}
                                    {provided.placeholder}
                                </BubbleContainer>
                            )}
                        </Droppable>
                    ))}
                </Row>
            </Container>
        </DragDropContext>
    );
};

export default BubbleEditor;
