package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.CardCategoryDto
import com.idleon.glacierfrostbuilds.domain.model.CardCategory
import org.mapstruct.Mapper
import org.mapstruct.NullValueMappingStrategy

@Mapper(
    componentModel = "spring",
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
)
abstract class CardCategoryMapper {
    abstract fun toDto(source: CardCategory): CardCategoryDto
    abstract fun toDto(source: List<CardCategory>): List<CardCategoryDto>
    abstract fun fromDto(source: CardCategoryDto): CardCategory
}