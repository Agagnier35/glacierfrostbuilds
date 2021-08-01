package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.CardDto
import com.idleon.glacierfrostbuilds.domain.model.Card
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface CardsMapper {
    fun toDto(source: Card): CardDto
    fun toDto(source: List<Card>): List<CardDto>
}