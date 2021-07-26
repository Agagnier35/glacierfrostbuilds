import Tags from '../../api/model/tags';

const getColorForTag = (t: Tags) => {
    switch (t.category) {
        case 'Skill':
            return { bg: 'info', hex: '#5bc0de' };
        case 'Focus':
            return { bg: 'warning', hex: '#f89406' };
        case 'Fighting':
            return { bg: 'danger', hex: '#ee5f5b' };
        case 'World':
            return { bg: 'secondary', hex: '#7a8288' };
        case 'Other':
            return { bg: 'primary', hex: '#3a3f44' };
        default:
            return { bg: '', hex: '#' };
    }
};

export default getColorForTag;
