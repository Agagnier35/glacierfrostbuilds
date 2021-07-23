import produce from 'immer';
import React, { createContext, useEffect, useState } from 'react';
import { Accordion, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Build, { buildDefaultBuild } from '../../api/model/build';
import BuildRepository from '../../api/repository/buildRepository';
import ClassSelector from '../../components/class-selector';
import GeneralInformation from '../../components/general-informations';
import TalentBuilder from '../../components/talent-builder';
import useCurrentGameVersion from '../../hooks/useCurrentGameVersion';
import useHandleApiError from '../../hooks/useHandleApiError';
import { CenterDiv } from './style';

interface BuildContextProps {
    build: Build;
    editBuild(b: Build): void;
}
export const BuildContext = createContext<BuildContextProps>({ build: buildDefaultBuild(), editBuild: () => {} });

const CreateBuild = () => {
    useHandleApiError();

    const [build, editBuild] = useState<Build>(buildDefaultBuild());
    const gameVers = useCurrentGameVersion();

    useEffect(() => {
        editBuild(
            produce(build, (draft) => {
                draft.gameVersion = gameVers;
            }),
        );
        /* eslint-disable */
    }, [gameVers]);
    /* eslint-enable */

    const createBuild = () => {
        BuildRepository.postBuild(build).then((b) => toast.success(`Build Created, ${b?.buildId}`));
    };

    return (
        <BuildContext.Provider value={{ build, editBuild }}>
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
