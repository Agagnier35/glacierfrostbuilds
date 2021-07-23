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

    const buildTalent = build.talents?.find((t) => t.talentId === talent.talentId);
    return (
        <Col onClick={() => setActiveTalent(talent)} style={{ padding: 0 }}>
            <Image
                src={`assets/talents/${talent.className}/${talent.displayTab}-${talent.displayOrder + 1}.png`}
                fluid
            />
            <TalentPointCounter className={buildTalent?.comments ? 'text-danger' : 'text-info'}>
                {buildTalent?.points ?? 0}
            </TalentPointCounter>
        </Col>
    );
};

export default TalentSelector;
