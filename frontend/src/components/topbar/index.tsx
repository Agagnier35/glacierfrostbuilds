import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../api/apiGateway';
import { AuthContext } from '../../utils/authProvider';
import { Mascot } from './style';

const Topbar = () => {
    const { auth, logout } = useContext(AuthContext);

    return (
        <Navbar bg="primary" variant="dark" className="mb-3 px-3" expand="md">
            <Navbar.Brand>
                <Mascot src="assets/GlacierFrostMascot.png" />
                <Link to="/" className="home-link">
                    GlacierFrost2's Builds
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Item>
                        <Link to="/builds" className="nav-link">
                            Search
                        </Link>
                    </Nav.Item>

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

                <Nav className="ms-auto">
                    {auth?.user ? (
                        <NavDropdown title={auth.user} id="nav-dropdown" align="end" className="text-success">
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <NavDropdown title="Login" id="nav-dropdown" align="end">
                            <NavDropdown.Item href={`${serverUrl}/oauth2/authorization/discord`}>
                                Discord
                            </NavDropdown.Item>
                            <NavDropdown.Item href={`${serverUrl}/oauth2/authorization/google`}>
                                Google
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Topbar;
