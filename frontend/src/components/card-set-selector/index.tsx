import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Figure, Row } from 'react-bootstrap';
import { CardCategory } from '../../api/model/card-category';
import CardsRepository from '../../api/repository/cardRepository';
import { BuildContext } from '../../pages/create-build';

const CardSetSelector = () => {
    const { build, editBuild } = useContext(BuildContext);

    const [cardCategories, setCardCategories] = useState<CardCategory[]>([]);

    useEffect(() => {
        CardsRepository.getAllCardsCategory().then(setCardCategories);
    }, []);

    return (
        <Container fluid className="mb-3">
            <Row className="mb-3">
                Active Card Set:{' '}
                {build.cardSet ? (
                    <>
                        <b>{build.cardSet.cardCategory}:</b>
                        <span>{build.cardSet.setEffect}</span>
                    </>
                ) : null}
            </Row>
            <Row xs={4}>
                {cardCategories.map((c) => (
                    <Col
                        key={c.cardCategory}
                        as={Button}
                        variant={`${c.cardCategory === build?.cardSet?.cardCategory ? 'secondary' : 'outline-primary'}`}
                        style={{ padding: '0.5rem 0.25rem ' }}
                        onClick={() =>
                            editBuild(
                                produce(build, (draft) => {
                                    if (draft.cardSet?.cardCategory === c.cardCategory) draft.cardSet = undefined;
                                    else draft.cardSet = c;
                                }),
                            )
                        }
                    >
                        <Figure.Image
                            src={`./assets/cards/${c.cardCategory.replaceAll(' ', '_')}.png`}
                            width="56"
                            height="72"
                            style={{ objectFit: 'contain', margin: 0 }}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardSetSelector;
