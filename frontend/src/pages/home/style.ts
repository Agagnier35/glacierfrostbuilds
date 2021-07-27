import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Splash = styled.div`
    margin-top: -1rem;
    padding: 3rem 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    background-image: linear-gradient(-20deg, #6e45e2 0%, #88d3ce 100%);
    color: whitesmoke;
`;

export const SellingPoint = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    height: 100%;

    .repo-card {
        width: 100%;
    }
    .avatar {
        display: none;
    }
`;

export const FunniQuote = styled.p`
    border-radius: 0.3rem;
    padding: 1rem;
    margin: 1rem;
    font-style: italic;
    text-align: center;
    font-size: 1.5rem;
`;
