import 'bootswatch/dist/slate/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import './bootswatchOverrides.css'; //must be after!
import ErrorBoundary from './components/error-boundary';
import CreateBuild from './pages/create-build';
import Home from './pages/home';

const Mascot = styled(Image)`
    height: 40px;
    margin-right: 5px;

    & + .home-link {
        text-decoration: none;
    }
`;

const App = () => {
    return (
        <Router>
            <ToastContainer position="bottom-right" autoClose={5000} pauseOnFocusLoss pauseOnHover />
            <Navbar bg="primary" variant="dark" className="mb-3">
                <Container fluid>
                    <Navbar.Brand>
                        <Mascot src="assets/GlacierFrostMascot.png" />
                        <Link to="/" className="home-link">
                            GlacierFrostBuilds
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Item></Nav.Item>
                        <Nav.Item>
                            <Link to="/create" className="nav-link">
                                Create
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>

            <Switch>
                <Route path="/" exact>
                    <ErrorBoundary>
                        <Home />
                    </ErrorBoundary>
                </Route>
                <Route path="/create">
                    <ErrorBoundary>
                        <CreateBuild />
                    </ErrorBoundary>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
