import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';

const About = () => {
    return (
        <Container fluid>
            <Card>
                <Card.Header>About</Card.Header>
                <Card.Body>
                    <p>
                        GlacierFrost2Builds is open-source and you can find the code{' '}
                        <a href="https://github.com/Agagnier35/glacierfrostbuilds">here</a>
                    </p>
                    <br />
                    <Container fluid>
                        <h3>About me:</h3>
                        <Row className="mb-3">
                            <p className="mb-0">
                                <a href="https://discord.com/users/97851065701003264">Discord (Grago#5082)</a> &lt;--
                                Send your suggestions/bugs here
                            </p>
                            <a href="https://github.com/Agagnier35">Github</a>
                            <a href="https://twitter.com/Agagnier35">Twitter</a>
                        </Row>
                        <Row>
                            <h5>Credits</h5>
                            <br />
                            <p className="text-info mb-0">
                                To the Idleon <a href="https://idleon.info/">Wiki</a> team, for their never-ending
                                contribution to the community.
                            </p>
                            <p className="text-danger mb-0">
                                As always, thanks to LavaFlame2 for another great game, and for all the assets and
                                informations used in this website. Go play{' '}
                                <a href="https://www.legendsofidleon.com/">Legends of Idleon</a>
                            </p>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Roadmap</Card.Header>
                <Card.Body>
                    <Row>
                        <h5>Will Do:</h5>
                        <p style={{ textDecoration: 'line-through' }}>Create Builds</p>
                        <p style={{ textDecoration: 'line-through' }}>Discord SSO login</p>
                        <p style={{ textDecoration: 'line-through' }}>View 1 Build</p>
                        <p>
                            <pre style={{ textDecoration: 'line-through', display: 'inline' }}>
                                View Builds using search function (class, tags,
                            </pre>{' '}
                            sort upvoted, new, etc...)
                        </p>
                        <p>Upvotes/downvotes Builds</p>
                    </Row>
                    <Row>
                        <h5>Should Do Eventually: </h5>
                        <p>Bubbles/Vials Priority Builds</p>
                        <p>Card Builds</p>
                        <p>Constellation Builds</p>
                        <p>Stamps priority Builds</p>
                    </Row>
                    <Row>
                        <h5>Ideas / If community is interested</h5>
                        <p>Other SSO types(github, google, etc..)</p>
                        <p>Statue priority Builds</p>
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Changelog</Card.Header>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <h3>v0.1.0</h3>
                            <p>Initial launch of the Tool</p>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default About;
