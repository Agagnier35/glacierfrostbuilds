import produce from 'immer';
import React, { createContext, useEffect, useState } from 'react';
import { Accordion, Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Build, { buildDefaultBuild } from '../../api/model/build';
import BuildRepository from '../../api/repository/buildRepository';
import ClassSelector from '../../components/class-selector';
import GeneralInformation from '../../components/general-informations';
import TalentBuilder from '../../components/talent-builder';
import useCurrentGameVersion from '../../hooks/useCurrentGameVersion';
import { CenterDiv } from './style';

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
    const [build, editBuild] = useState<Build>(buildDefaultBuild());
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

    return (
        <BuildContext.Provider value={{ build, editBuild, editMode: true }}>
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
                <CenterDiv>
                    <Button variant="success" onClick={createBuild}>
                        Publish!
                    </Button>
                </CenterDiv>
            </Container>
        </BuildContext.Provider>
    );
};

export default CreateBuild;
