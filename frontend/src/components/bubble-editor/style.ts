import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const BuildBubbleContainer = styled.div<{ isDragging: boolean }>`
    position: relative;
    background: ${({ isDragging }) => (isDragging ? 'lightblue' : 'transparent')};
    border: 1px solid #ebecec;
    border-radius: 10px;

    margin: 1px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    overflow-x: auto;

    min-width: 300px;
    width: 33%;
    min-height: 110px;
    margin-right: 2px;
`;

export const BubbleContainer = styled(Col)<{ isDragging: boolean }>`
    background: ${({ isDragging }) => (isDragging ? 'lightblue' : 'transparent')};

    flex-direction: column;
    display: flex;
    align-items: center;

    overflow-y: auto;
    max-height: 500px;
    padding: 0;
`;

export const BubbleItem = styled.div<{ isDragging: boolean }>`
    user-select: none;

    flex: 0 0 56px;
    height: 56px;

    background: ${({ isDragging }) => (isDragging ? 'lightgreen' : 'transparent')};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        margin-bottom: 0;
    }
`;
