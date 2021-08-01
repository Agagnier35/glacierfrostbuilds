import base64url from 'base64url';
import produce from 'immer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Badge, Button, Col, Figure, Row, Spinner } from 'react-bootstrap';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buildDefaultBuild } from '../../api/model/build';
import { BuildCardGroups } from '../../api/model/build-cards';
import BuildRepository from '../../api/repository/buildRepository';
import GameRepository from '../../api/repository/gameRepository';
import VoteRepository from '../../api/repository/voteRepository';
import { BuildCardContainer, CardItem, GroupLabel } from '../../components/card-editor/style';
import NumberPicker from '../../components/number-picker';
import getColorForTag from '../../components/tag-editor/tag-color';
import TalentBuilder from '../../components/talent-builder';
import { AuthContext } from '../../utils/authProvider';
import { BuildChecker } from '../../utils/build-checker';
import { BuildContext } from '../create-build';
import { UpdateBuildButtonGroup } from './style';
const zlib = require('zlib');

const ViewBuild = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const { buildId } = useParams<{ buildId: string }>();
    const saved = !isNaN(parseInt(buildId));

    const { auth } = useContext(AuthContext);

    const [build, setBuild] = useState(buildDefaultBuild());
    const [gameVersion, setGameVersion] = useState<string>('');

    useEffect(() => {
        if (saved) {
            BuildRepository.getOneBuild(buildId)
                .then(setBuild)
                .catch((e) => {
                    if (e.response.status === 404) {
                        toast.error('Build does not exist');
                    }
                });
            GameRepository.getCurrentGameVersion().then(setGameVersion);
        } else {
            const base64decoded = base64url.toBuffer(buildId);
            const decoded = zlib.gunzipSync(base64decoded);
            const parsed = JSON.parse(decoded.toString());
            const errors = BuildChecker.strictValidate(parsed);
            if (errors == null) {
                setBuild(parsed);
            } else {
                console.log(errors);
                toast.error('Unknown Build state');
            }
        }
    }, [buildId, saved]);

    const upvote = useCallback(
        async (b: number) => {
            const token = await executeRecaptcha?.('upvote_build');

            if (token) {
                await VoteRepository.upvote(b, token, build.userVote);
                setBuild(
                    produce(build, (draft) => {
                        switch (draft.userVote) {
                            case 'DOWNVOTE':
                                draft.upvotes += 2;
                                break;
                            case 'UPVOTE':
                                draft.upvotes -= 1;
                                draft.userVote = undefined;
                                return;
                            default:
                                draft.upvotes += 1;
                                break;
                        }
                        draft.userVote = 'UPVOTE';
                    }),
                );
            } else {
                toast.error('reCAPTCHA Failed');
            }
        },
        [build, executeRecaptcha],
    );

    const downvote = useCallback(
        async (b: number) => {
            const token = await executeRecaptcha?.('downvote_build');

            if (token) {
                await VoteRepository.downvote(b, token, build.userVote);
                setBuild(
                    produce(build, (draft) => {
                        switch (draft.userVote) {
                            case 'DOWNVOTE':
                                draft.upvotes += 1;
                                draft.userVote = undefined;
                                return;
                            case 'UPVOTE':
                                draft.upvotes -= 2;
                                break;
                            default:
                                draft.upvotes -= 1;
                                break;
                        }
                        draft.userVote = 'DOWNVOTE';
                    }),
                );
            } else {
                toast.error('reCAPTCHA Failed');
            }
        },
        [build, executeRecaptcha],
    );

    const bumpVersion = useCallback(async () => {
        const token = await executeRecaptcha?.('bump_build');
        if (token) {
            const nb = await BuildRepository.bumpBuildVersion(build, token);
            setBuild(nb);
        } else {
            toast.error('reCAPTCHA Failed');
        }
    }, [build, executeRecaptcha]);

    const deprecate = useCallback(async () => {
        const token = await executeRecaptcha?.('deprecate_build');
        if (token) {
            const nb = await BuildRepository.deprecateBuild(build, token);
            setBuild(nb);
        } else {
            toast.error('reCAPTCHA Failed');
        }
    }, [build, executeRecaptcha]);

    return (
        <div className="p-2 m-3 bg-primary rounded-3">
            {!build.buildId ? (
                <Spinner animation="border" />
            ) : (
                <>
                    <Row>
                        {saved && (
                            <Col xs={2} sm={1} className="mx-3 d-flex justify-content-center align-items-center">
                                <NumberPicker
                                    value={build.upvotes}
                                    canEditValue={false}
                                    status={build.userVote}
                                    increment={() => upvote(build.buildId ?? 0)}
                                    decrement={() => downvote(build.buildId ?? 0)}
                                />
                            </Col>
                        )}
                        <Figure.Image
                            src={`./assets/classes/${build.playerClass.className}.png`}
                            style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'contain' }}
                        />
                        <Col className="px-3">
                            <Row
                                as="h1"
                                className="mb-0 px-3"
                                style={{ textDecoration: build.deprecated ? 'line-through' : '' }}
                            >
                                {build.buildName}
                            </Row>
                            {saved && (
                                <Row as="h5" className="mb-3 px-3">
                                    By: {build.author}
                                </Row>
                            )}
                            <Row as="p" className="px-3">
                                {build.description}
                            </Row>
                        </Col>
                        <Col xs={12} md={3} lg={4}>
                            <Row as="h5" className="mb-3 px-3">
                                <Col className="px-0">
                                    Game Version:{' '}
                                    <span className={build.gameVersion !== gameVersion ? 'text-danger' : ''}>
                                        {build.gameVersion}
                                    </span>
                                </Col>
                                {auth?.user === build.author && build.gameVersion !== gameVersion && !build.deprecated && (
                                    <UpdateBuildButtonGroup className="px-0" size="sm">
                                        <Col as={Button} variant="success" onClick={bumpVersion}>
                                            Update build to current version
                                        </Col>
                                        <Col as={Button} variant="danger" onClick={deprecate}>
                                            Mark as deprecated
                                        </Col>
                                    </UpdateBuildButtonGroup>
                                )}
                            </Row>
                            <Row as="h5" className="mb-3 px-3">
                                Recommended Min Level: {build.minLevel}
                            </Row>
                            <Row as="h5" className="mb-3 px-3">
                                Recommended Max Level: {build.maxLevel}
                            </Row>
                            <Row className="mb-3 px-3">
                                {build.tags.map((t) => (
                                    <Col
                                        as={Badge}
                                        key={t.tagId}
                                        pill
                                        className="m-1"
                                        bg={getColorForTag(t).bg}
                                        style={{ maxWidth: '100px' }}
                                    >
                                        {t.tagName}
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <BuildContext.Provider value={{ build, editBuild: setBuild, editMode: false }}>
                            <TalentBuilder />
                        </BuildContext.Provider>
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Figure.Image
                                width={56}
                                height={72}
                                src={`./assets/cards/${build.cardSet?.cardCategory.replaceAll(' ', '_')}.png`}
                                alt={`${build.cardSet?.cardCategory.replaceAll(' ', '_')}.png`}
                                style={{ objectFit: 'contain', margin: 0 }}
                            />
                        </Col>
                        <Col xs={11}>
                            <Row as="b">{build.cardSet?.cardCategory}</Row>
                            <Row>{build.cardSet?.setEffect}</Row>
                        </Col>
                    </Row>
                    <Row style={{ padding: '0 1rem' }}>
                        {BuildCardGroups.map((g) => (
                            <BuildCardContainer isDragging={false}>
                                <GroupLabel>{g}</GroupLabel>
                                {build.cards
                                    .filter((c) => c.group === g)
                                    .map((c) => (
                                        <CardItem isDragging={false}>
                                            <Figure.Image
                                                width={56}
                                                height={72}
                                                src={`./assets/cards/${c.card?.name?.replaceAll(' ', '_')}.png`}
                                                alt={c.card?.name}
                                            />
                                        </CardItem>
                                    ))}
                            </BuildCardContainer>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
};

export default ViewBuild;
