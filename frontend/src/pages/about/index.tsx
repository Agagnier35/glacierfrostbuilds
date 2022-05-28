import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';

const About = () => {
    return (
        <Container fluid>
            <Card>
                <Card.Header>About</Card.Header>
                <Card.Body>
                    <Container fluid>
                        <p className="mb-0">
                            GlacierFrost2's Builds is open-source and you can find the code{' '}
                            <a href="https://github.com/Agagnier35/glacierfrostbuilds">here</a>
                        </p>
                        <br />
                        <div className="mb-2 p-0">
                            I made this tool because we had an excel sheet, which got deprecated for the
                            idleoncompanion.
                            <br />
                            <br />
                            Then idleoncompanion hasn't updated been in a while, making their builds deprecated
                        </div>
                    </Container>
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
                        <p style={{ textDecoration: 'line-through' }}>Edit 1 Build</p>
                        <p style={{ textDecoration: 'line-through' }}>
                            View Builds using search function (class, tags, sort upvoted, new, etc...)
                        </p>
                        <p style={{ textDecoration: 'line-through' }}>Upvotes/downvotes Builds</p>
                        <p style={{ textDecoration: 'line-through' }}>Remove login requirements</p>
                    </Row>
                    <Row>
                        <h5>Should Do Eventually: </h5>
                        <p style={{ textDecoration: 'line-through' }}>Bubbles Priority Builds</p>
                        <p style={{ textDecoration: 'line-through' }}>Card Builds</p>
                        <p>Constellation Builds</p>
                        <p>Stamps priority Builds</p>
                    </Row>
                    <Row>
                        <h5>Ideas / If community is interested</h5>
                        <p>Other SSO types(github, google, etc..)</p>
                        <p>Statue priority Builds</p>
                        <p>Vials priority Builds</p>
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Changelog</Card.Header>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <h3>0.3.0</h3>
                            <p>Added Elite Classes and W4 cards and bubble</p>
                            <p>
                                &nbsp; Didn't update old content and talents, probably not 100% up to date with current
                                game
                            </p>
                        </Row>
                        <Row>
                            <h3>v0.2.0</h3>
                            <p>Remove login Requirement for creating builds</p>
                            <p>Remove login Requirement for upvote-downvote</p>
                            <p>Edit a build if you are the creator</p>
                            <p>one-click build deprecation/Version bump (if you are the creator)</p>
                            <p>Adding cards to your build</p>
                            <p>Adding Card Set to your build</p>
                            <p>Alchemy bubbles priority/ recommended points amount</p>
                        </Row>
                        <Row>
                            <h3>v0.1.2</h3>
                            <p>Add a more interesting homepage</p>
                        </Row>
                        <Row>
                            <h3>v0.1.1</h3>
                            <p>Add Upvotes/downvote builds</p>
                            <p>Add Created timestamp</p>
                            <p>Add Sort functionality (upvote or timestamp)</p>
                        </Row>
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
