import chroma from 'chroma-js';
import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react';
import Select, { OptionsType } from 'react-select';
import Tags from '../../api/model/tags';
import TagsRepository from '../../api/repository/tagsRepository';
import { BuildContext } from '../../pages/create-build';
import getColorForTag from './tag-color';

type MyOptionType = { label: string; value: number; category: string };

const TagEditor = () => {
    const { build, editBuild } = useContext(BuildContext);
    const [tags, setTags] = useState<Tags[]>([]);

    useEffect(() => {
        TagsRepository.getAllTags().then(setTags);
    }, []);

    const onChange = (value: OptionsType<MyOptionType>) =>
        editBuild(
            produce(build, (draft) => {
                draft.tags = value.map((v) => tags.find((t) => t.tagId === v.value)).filter((v): v is Tags => !!v);
            }),
        );

    const colorStyles = {
        option: (styles: any, { data, isFocused, isSelected }: any) => {
            const color = chroma(getColorForTag(data).hex);
            return {
                ...styles,
                backgroundColor: isSelected ? color.css() : isFocused ? color.alpha(0.1).css() : color.alpha(0.5).css(),
                color: isFocused ? 'black' : 'white',
                border: `1px solid ${color.css()}`,

                ':active': {
                    ...styles[':active'],
                    backgroundColor: isSelected ? data.color : color.alpha(0.3).css(),
                },
            };
        },
        multiValue: (styles: any, { data }: any) => {
            const color = chroma(getColorForTag(data).hex);
            return {
                ...styles,
                border: `1px solid ${color.css()}`,
                backgroundColor: color.alpha(0.7).css(),
            };
        },
        multiValueLabel: (styles: any, { data }: any) => {
            const color = chroma(getColorForTag(data).hex);
            return {
                ...styles,
                color: chroma.contrast(color, 'white') > 2 ? 'white' : 'black',
            };
        },
        multiValueRemove: (styles: any, { data }: any) => {
            const color = chroma(getColorForTag(data).hex);
            return {
                ...styles,
                color,
                border: `1px solid ${color.css()}`,
                ':hover': {
                    backgroundColor: color,
                    color: 'white',
                },
            };
        },
    };

    return (
        <Select
            closeMenuOnSelect={false}
            isMulti
            placeholder="Select tags..."
            isSearchable
            value={build.tags?.map((t) => ({ label: t.tagName, value: t.tagId, category: t.category }))}
            options={tags.map((t) => ({ label: t.tagName, value: t.tagId, category: t.category }))}
            styles={colorStyles}
            onChange={onChange}
        />
    );
};

export default TagEditor;
