import produce from 'immer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Figure, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { BuildCardGroups, BuildCards } from '../../api/model/build-cards';
import { Card } from '../../api/model/card';
import CardsRepository from '../../api/repository/cardRepository';
import { BuildContext } from '../../pages/create-build';
import { BuildCardContainer, CardContainer, CardItem, GroupLabel } from './style';

const CardEditor = () => {
    const { build, editBuild } = useContext(BuildContext);

    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        CardsRepository.getAllCards().then(setCards);
    }, []);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { source, destination, draggableId } = result;
            const cardId = parseInt(draggableId);
            // dropped outside the list
            if (!destination) {
                return;
            }
            if (source.droppableId === destination.droppableId && BuildCardGroups.includes(destination.droppableId)) {
                editBuild(
                    produce(build, (draft) => {
                        draft.cards.forEach((card) => {
                            if (source.index < destination.index) {
                                if (card.order > source.index && card.order <= destination.index) {
                                    if (source.index < destination.index) {
                                        card.order--;
                                    }
                                }
                            } else {
                                if (card.order >= destination.index && card.order < source.index) {
                                    card.order++;
                                }
                            }
                        });
                        draft.cards.find((card) => card.cardId === cardId)!.order = destination.index;
                    }),
                );
            } else {
                if (BuildCardGroups.includes(destination.droppableId)) {
                    editBuild(
                        produce(build, (draft) => {
                            draft.cards
                                .filter(
                                    (card) => card.group === destination.droppableId && card.order >= destination.index,
                                )
                                .forEach((card) => card.order++);
                            draft.cards.splice(destination.index, 0, {
                                cardId,
                                group: destination.droppableId,
                                order: destination.index,
                            });
                        }),
                    );
                    setCards(
                        cards.map((c) => {
                            if (c.cardId === cardId) {
                                c.hide = true;
                            }
                            return c;
                        }),
                    );
                } else if (BuildCardGroups.includes(source.droppableId)) {
                    editBuild(
                        produce(build, (draft) => {
                            draft.cards = draft.cards.filter((c) => c.cardId !== cardId);
                        }),
                    );
                    setCards(
                        cards.map((c) => {
                            if (c.cardId === cardId) {
                                c.hide = false;
                            }
                            return c;
                        }),
                    );
                }
            }
        },
        [build, editBuild, cards],
    );

    const cardCategory: Card[][] = [];
    new Set(cards.map((c) => c.category.categoryOrder)).forEach((co) =>
        cardCategory.splice(
            co,
            0,
            cards.filter((c) => c.category.categoryOrder === co),
        ),
    );

    const buildCardGroups: { [groupId: string]: BuildCards[] } = {};
    BuildCardGroups.forEach(
        (g) => (buildCardGroups[g] = build.cards.filter((c) => c.group === g).sort((c1, c2) => c1.order - c2.order)),
    );

    return cards.length === 0 ? (
        <Spinner animation="border" />
    ) : (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => window.navigator.vibrate?.(100)}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Object.entries(buildCardGroups).map(([g, cardBuild]) => (
                    <Droppable key={g} droppableId={g} direction="horizontal">
                        {(provided, snapshot) => (
                            <BuildCardContainer ref={provided.innerRef} isDragging={snapshot.isDraggingOver}>
                                <GroupLabel>{g}</GroupLabel>
                                {cardBuild.map((c, index) => (
                                    <Draggable key={c.cardId} draggableId={c.cardId.toString()} index={index}>
                                        {(provided, snapshot) => {
                                            const card = cards.find((cc) => c.cardId === cc.cardId);
                                            return (
                                                <CardItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    isDragging={snapshot.isDragging}
                                                    style={provided.draggableProps.style}
                                                >
                                                    <Figure.Image
                                                        width={56}
                                                        height={72}
                                                        src={`./assets/cards/${card?.name?.replaceAll(' ', '_')}.png`}
                                                        alt={card?.name}
                                                    />
                                                </CardItem>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </BuildCardContainer>
                        )}
                    </Droppable>
                ))}
            </div>
            <br />
            {cardCategory.map((cc) => (
                <Droppable
                    key={cc[0].category.cardCategory}
                    droppableId={cc[0].category.cardCategory}
                    direction="horizontal"
                >
                    {(provided, snapshot) => (
                        <CardContainer ref={provided.innerRef} isDragging={snapshot.isDraggingOver}>
                            {cc.map((c, index) =>
                                !c.hide ? (
                                    <Draggable key={c.cardId} draggableId={c.cardId.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <CardItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={provided.draggableProps.style}
                                            >
                                                <OverlayTrigger
                                                    key={`triger-${c.cardId}`}
                                                    placement="top"
                                                    overlay={
                                                        <Popover id={`tooltip-${c.cardId}`}>
                                                            <Popover.Header>{c.name}</Popover.Header>
                                                            <Popover.Body>{c.effect}</Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <Figure.Image
                                                        width={56}
                                                        height={72}
                                                        src={`./assets/cards/${c.name.replaceAll(' ', '_')}.png`}
                                                        alt={c.name}
                                                    />
                                                </OverlayTrigger>
                                            </CardItem>
                                        )}
                                    </Draggable>
                                ) : null,
                            )}
                            {provided.placeholder}
                        </CardContainer>
                    )}
                </Droppable>
            ))}
        </DragDropContext>
    );
};

export default CardEditor;
