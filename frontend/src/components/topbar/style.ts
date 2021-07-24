import { Image } from 'react-bootstrap';
import styled from 'styled-components';

export const Mascot = styled(Image)`
    height: 40px;
    margin-right: 5px;

    & + .home-link {
        text-decoration: none;
    }
`;
