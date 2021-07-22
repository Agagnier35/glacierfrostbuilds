import React, { useContext } from 'react';
import { Col, Image } from 'react-bootstrap';
import Talents from '../../api/model/talents';
import { BuildContext } from '../../pages/create-build';
import { TalentPointCounter } from './style';

interface TalentSelectorProps {
    talent: Talents;
    setActiveTalent(t: Talents): void;
}

const TalentSelector = ({ talent, setActiveTalent }: TalentSelectorProps) => {
    const { build } = useContext(BuildContext);

    return (
        <Col onClick={() => setActiveTalent(talent)}>
            <Image src="assets/unknown.png" fluid />
            <TalentPointCounter className="text-info">
                {build.talents?.find((t) => t.talentId === talent.talentId)?.points ?? 0}
            </TalentPointCounter>
        </Col>
    );
};

export default TalentSelector;
