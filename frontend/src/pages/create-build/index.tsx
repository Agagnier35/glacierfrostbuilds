import base64url from 'base64url';
import produce from 'immer';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Accordion, Button, Container, Figure, Form, FormGroup } from 'react-bootstrap';
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

    const createBuild = async () => {
        const newBuild = await BuildRepository.postBuild(build);
        history.push(`/builds/${newBuild.buildId}`);
    };

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
            {!auth && (
                <div className="m-3 p-3 bg-primary rounded-3 d-flex align-items-center">
                    <Figure.Image src="./assets/error.png" width={30} className="mx-3 my-0" />
                    <p className="text-danger m-0">
                        You are not logged in, you won't be able to publish your build! Use the login button in the top
                        right corner.
                    </p>
                </div>
            )}
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
                    <Button variant="success" onClick={createBuild} disabled={!auth}>
                        Publish!
                    </Button>
                    <Button variant="success" onClick={generateURLBuild}>
                        Generate URL without saving!
                    </Button>
                </CenterDiv>
            </Container>
        </BuildContext.Provider>
    );
};

export default CreateBuild;
