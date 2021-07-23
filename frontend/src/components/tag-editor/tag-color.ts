import Tags from '../../api/model/tags';

const getColorForTag = (t: Tags) => {
    switch (t.category) {
        case 'Skill':
            return '#85d4d5';
        case 'Focus':
            return '#ff3399';
        case 'Fighting':
            return '#4CBBFC';
        case 'World':
            return '#aad28c';
        case 'Other':
            return '#b79757';
        default:
            return '#ddd';
    }
};

export default getColorForTag;
