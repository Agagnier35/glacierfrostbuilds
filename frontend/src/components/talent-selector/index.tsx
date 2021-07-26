import React, { useContext } from 'react';
import { Figure } from 'react-bootstrap';
import Talents from '../../api/model/talents';
import { BuildContext } from '../../pages/create-build';
import { OneTalentContainer, TalentPointCounter } from './style';

interface TalentSelectorProps {
    talent: Talents;
    setActiveTalent(t: Talents): void;
}

const TalentSelector = ({ talent, setActiveTalent }: TalentSelectorProps) => {
    const { build } = useContext(BuildContext);

    const buildTalent = build.talents?.find((t) => t.talentId === talent.talentId);
    return (
        <OneTalentContainer onClick={() => setActiveTalent(talent)}>
            <Figure.Image
                width={80}
                height={80}
                src={`./assets/talents/${talent.className}/${talent.displayTab}-${talent.displayOrder + 1}.png`}
            />
            <TalentPointCounter className={buildTalent?.comments ? 'text-danger' : 'text-info'}>
                {buildTalent?.points ?? 0}
            </TalentPointCounter>
        </OneTalentContainer>
    );
};

export default TalentSelector;
