package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.TagsDto
import com.idleon.glacierfrostbuilds.domain.model.Tags
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface TagsMapper {
    fun toDto(source: Tags): TagsDto
    fun toDto(source: List<Tags>): List<TagsDto>
}