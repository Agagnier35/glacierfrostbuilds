package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.AlchemyBubbleDto
import com.idleon.glacierfrostbuilds.domain.model.AlchemyBubble
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface AlchemyBubbleMapper {
    fun toDto(source: AlchemyBubble): AlchemyBubbleDto
    fun toDto(source: List<AlchemyBubble>): List<AlchemyBubbleDto>
}