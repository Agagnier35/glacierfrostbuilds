import styled from 'styled-components';

export const BuildCardContainer = styled.div<{ isDragging: boolean }>`
    position: relative;
    background: ${({ isDragging }) => (isDragging ? 'lightblue' : 'transparent')};
    border: 1px solid #ebecec;
    border-radius: 10px;

    margin: 1px;
    display: flex;
    align-items: center;
    overflow-x: auto;

    min-width: 300px;
    width: 33%;
    min-height: 75px;
    margin-right: 2px;
`;

export const GroupLabel = styled.div`
    position: absolute;
    border-bottom-right-radius: 10px;
    padding: 0 0.5rem;
    top: 0;
    left: 0;
    color: #34393d;
    background-color: #ebecec;
`;

export const CardContainer = styled.div<{ isDragging: boolean }>`
    background: ${({ isDragging }) => (isDragging ? 'lightblue' : 'transparent')};

    padding-bottom: 10px;
    display: flex;
    overflow-x: auto;
`;

export const CardItem = styled.div<{ isDragging: boolean }>`
    user-select: none;
    margin: 0 4px;
    flex: 0 0 56px;
    height: 72px;

    background: ${({ isDragging }) => (isDragging ? 'lightgreen' : 'grey')};

    img {
        margin-bottom: 0;
    }
`;
