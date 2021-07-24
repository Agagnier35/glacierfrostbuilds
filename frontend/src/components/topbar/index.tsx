import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../api/apiGateway';
import { AuthContext } from '../../utils/authProvider';
import { Mascot } from './style';

const Topbar = () => {
    const { auth, logout } = useContext(AuthContext);

    return (
        <Navbar bg="primary" variant="dark" className="mb-3">
            <Container fluid>
                <Navbar.Brand>
                    <Mascot src="assets/GlacierFrostMascot.png" />
                    <Link to="/" className="home-link">
                        GlacierFrost2Builds
                    </Link>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Link to="/create" className="nav-link">
                            Create
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </Nav.Item>
                </Nav>
            </Container>

            <Container className="justify-content-end">
                {auth?.user ? (
                    <>
                        <Nav.Item className="text-success" style={{ marginRight: '1rem' }}>
                            {auth.user}
                        </Nav.Item>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </>
                ) : (
                    <>
                        <Nav.Item style={{ marginRight: '1rem' }}>Logins:</Nav.Item>
                        <Nav.Link href={`${serverUrl}/oauth2/authorization/discord`}>Discord</Nav.Link>
                    </>
                )}
            </Container>
        </Navbar>
    );
};

export default Topbar;
