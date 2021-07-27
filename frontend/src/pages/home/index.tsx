import React, { useEffect, useState } from 'react';
import { Button, Figure, Nav, Row } from 'react-bootstrap';
import { RepoCard } from 'react-github-cards';
import 'react-github-cards/dist/default.css';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import BuildRepository from '../../api/repository/buildRepository';
import GameRepository from '../../api/repository/gameRepository';
import { RestErrorToast } from '../../components/error-boundary';
import { FunniQuote, SellingPoint, Splash } from './style';

const Home = () => {
    const [buildCount, setBuildCount] = useState(0);
    const [quote, setQuote] = useState('');
    const [gameVersion, setGameVersion] = useState('');

    const location = useLocation<{ redirected: boolean }>();

    useEffect(() => {
        if (location?.state?.redirected) {
            toast.error(
                <RestErrorToast
                    restError={{
                        status: 401,
                        code: 'You must be logged in to do this',
                        issues: [],
                    }}
                />,
            );
        }
    }, [location]);

    useEffect(() => {
        BuildRepository.getBuildCount().then(setBuildCount);
        GameRepository.getQuote().then(setQuote);
        GameRepository.getCurrentGameVersion().then(setGameVersion);
    }, []);

    return (
        <>
            <Splash>
                Introducing <span className="text-danger">LavaFlame2</span>'s biggest enemy:{' '}
                <span className="text-info">GlacierFrost2</span>
            </Splash>
            <FunniQuote className="bg-primary">{quote}</FunniQuote>
            <Nav className="m-3 p-3 bg-primary rounded-3 d-flex" style={{ justifyContent: 'space-evenly' }}>
                <Nav.Item>
                    <Button as={Link} size="lg" variant="info" to="/builds" className="nav-link">
                        Search for builds
                    </Button>
                </Nav.Item>
                <Nav.Item>
                    <Button as={Link} size="lg" variant="info" to="/create" className="nav-link">
                        Create a build
                    </Button>
                </Nav.Item>
            </Nav>
            <div className="m-3 p-3 bg-primary rounded-3">
                <Row>
                    <SellingPoint lg={4} sm={6}>
                        <Figure.Image style={{ height: '80px' }} src="./assets/Builder_Bird.png" />
                        <h4>User generated Content</h4>
                        <p className="m-0">
                            Currently hosting <span className="text-warning">{buildCount}</span> builds!
                        </p>
                        <p className="m-0">
                            The tool supports version <span className="text-warning">{gameVersion}</span> of the game!
                        </p>
                    </SellingPoint>
                    <SellingPoint lg={4} sm={6}>
                        <Figure.Image style={{ height: '80px' }} src="./assets/discord.png" />
                        <h4>Simple &amp; easy account creation</h4>
                        <p>Connect with your Discord account, using their secure OAUTH2 SSO standard</p>
                    </SellingPoint>
                    <SellingPoint lg={4} sm={6}>
                        <Figure.Image style={{ height: '80px' }} src="./assets/stonks.png" />
                        <h4>Upvote/downvote builds</h4>
                        <p>
                            Help fellow users to find the best builds by upvoting them - or flex to your friends how
                            much upvotes you have :)
                        </p>
                    </SellingPoint>
                    <SellingPoint lg={4} sm={6}>
                        <Figure.Image style={{ height: '80px' }} src="./assets/classes/Maestro.png" />
                        <h4>Powerful Search Engine</h4>
                        <p>Use the advanced search features to find the build that fit your needs</p>
                    </SellingPoint>
                    <SellingPoint lg={4} sm={6}>
                        <Figure.Image style={{ height: '80px' }} src="./assets/lazy.png" />
                        <h4>Minimal Developer Maintenance</h4>
                        <p>
                            Since the content is generated by users, unless Lava brings major changes (ex: adding
                            classes, talents, etc...), the users decides what builds are relevant or not
                        </p>
                    </SellingPoint>
                    <SellingPoint lg={4} sm={6}>
                        <Figure.Image style={{ height: '80px' }} src="./assets/stare.png" />
                        <h4 className="mb-3">Open-Source Project</h4>

                        <RepoCard username="Agagnier35" repo="glacierfrostbuilds" />
                    </SellingPoint>
                </Row>
            </div>
            <div className="m-3 p-3 bg-primary rounded-3">
                I made this tool because we had an excel sheet, which got deprecated for the idleoncompanion.
                <br />
                <br />
                Then idleoncompanion hasn't updated been in a while, making their builds deprecated
            </div>
        </>
    );
};

export default Home;
