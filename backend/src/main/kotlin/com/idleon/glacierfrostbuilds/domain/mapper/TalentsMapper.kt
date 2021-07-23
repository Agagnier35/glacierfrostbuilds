package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.TalentsDto
import com.idleon.glacierfrostbuilds.domain.model.Talents
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface TalentsMapper {
    @Mapping(target = "className", source = "playerClass.className")
    fun toDto(source: Talents): TalentsDto
    fun toDto(source: List<Talents>): List<TalentsDto>
}