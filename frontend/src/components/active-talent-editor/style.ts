import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const TalentContainer = styled(Container)`
    .col,
    .col-8 {
        padding: 0;
    }

    p {
        padding: 0;
        margin: 0;
        margin-bottom: 0.2rem;
    }

    .container {
        padding-right: var(--bs-gutter-x, 0.5rem);
        padding-left: var(--bs-gutter-x, 0.5rem);
    }
`;
