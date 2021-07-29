import base64url from 'base64url';
import produce from 'immer';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Accordion, Button, Container, Form, FormGroup } from 'react-bootstrap';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Build, buildDefaultBuild } from '../../api/model/build';
import BuildRepository from '../../api/repository/buildRepository';
import ClassSelector from '../../components/class-selector';
import GeneralInformation from '../../components/general-informations';
import TalentBuilder from '../../components/talent-builder';
import useCurrentGameVersion from '../../hooks/useCurrentGameVersion';
import { AuthContext } from '../../utils/authProvider';
import { CenterDiv } from './style';
const zlib = require('zlib');

interface BuildContextProps {
    build: Build;
    editBuild(b: Build): void;
    editMode: boolean;
}
export const BuildContext = createContext<BuildContextProps>({
    build: buildDefaultBuild(),
    editBuild: () => {},
    editMode: false,
});

const CreateBuild = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const history = useHistory();
    const { auth } = useContext(AuthContext);

    const [build, editBuild] = useState<Build>(buildDefaultBuild());
    const [generatedURL, setGeneratedURL] = useState('');
    const gameVers = useCurrentGameVersion();

    useEffect(() => {
        if (!build.gameVersion) {
            editBuild(
                produce(build, (draft) => {
                    draft.gameVersion = gameVers;
                }),
            );
        }
        /* eslint-disable */
    }, [gameVers, build.gameVersion]);
    /* eslint-enable */

    useEffect(() => {
        if (auth?.user) {
            editBuild(
                produce(build, (draft) => {
                    draft.author = auth.user!;
                }),
            );
        }
        /* eslint-disable */
    }, [auth]);
    /* eslint-enable */

    const createBuild = useCallback(async () => {
        const token = await executeRecaptcha?.('create_build');

        if (token) {
            const newBuild = await BuildRepository.postBuild(build, token);
            history.push(`/builds/${newBuild.buildId}`);
        } else {
            toast.error('reCAPTCHA Failed');
        }
    }, [build, executeRecaptcha, history]);

    const generateURLBuild = () => {
        if (!build.playerClass.className) {
            toast.error('You need to select a class');
        } else {
            const buildString = Buffer.from(
                JSON.stringify(
                    produce(build, (draft) => {
                        draft.buildId = -1;
                        draft.playerClass.talents = [];
                    }),
                ),
                'utf-8',
            );
            const encoded = zlib.gzipSync(buildString);
            setGeneratedURL(`${window.location.origin}/builds/${base64url(encoded)}`);
        }
    };

    return (
        <BuildContext.Provider
            value={{
                build,
                editBuild: (b) => {
                    console.log('Edit called');
                    editBuild(b);
                },
                editMode: true,
            }}
        >
            <Container fluid>
                <Accordion defaultActiveKey="0" className="mb-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>General Information</Accordion.Header>
                        <Accordion.Body>
                            <GeneralInformation />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Class</Accordion.Header>
                        <Accordion.Body>
                            <ClassSelector />
                            <TalentBuilder />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                {generatedURL && (
                    <FormGroup>
                        <Form.Label>Build generated at: </Form.Label>
                        <Form.Control readOnly value={generatedURL} onFocus={(e) => e.target.select()} />
                    </FormGroup>
                )}
                <CenterDiv>
                    <Button variant="success" onClick={createBuild}>
                        Publish!
                    </Button>
                    <Button variant="success" onClick={generateURLBuild}>
                        Share URL without saving
                    </Button>
                </CenterDiv>
            </Container>
        </BuildContext.Provider>
    );
};

export default CreateBuild;
