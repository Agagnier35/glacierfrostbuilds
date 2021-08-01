package com.idleon.glacierfrostbuilds.domain.mapper


import com.idleon.glacierfrostbuilds.api.dto.BuildCardsDto
import com.idleon.glacierfrostbuilds.api.exceptions.RestError
import com.idleon.glacierfrostbuilds.api.exceptions.RestException
import com.idleon.glacierfrostbuilds.api.exceptions.RestIssueFactory
import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.model.BuildCards
import com.idleon.glacierfrostbuilds.domain.model.BuildCardsId
import com.idleon.glacierfrostbuilds.domain.repositories.CardRepository
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages
import org.mapstruct.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus

@Mapper(
    componentModel = "spring", uses = [CardRepository::class],
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT
)
abstract class BuildCardsMapper {
    @Autowired
    protected lateinit var cardRepository: CardRepository

    @Autowired
    protected lateinit var issueFactory: RestIssueFactory


    @Mapping(target = "cardId", expression = "java(source.getKey().getCardId())")
    abstract fun toDto(source: BuildCards): BuildCardsDto
    abstract fun toDto(source: List<BuildCards>): List<BuildCardsDto>

    @Mappings(
        Mapping(target = "key", ignore = true),
        Mapping(target = "card", ignore = true),
        Mapping(target = "build", ignore = true)
    )
    abstract fun fromDto(source: BuildCardsDto, @Context build: Build): BuildCards

    @AfterMapping
    fun afterFromDto(
        source: BuildCardsDto,
        @MappingTarget target: BuildCards?,
        @Context build: Build
    ): BuildCards? {
        if (target != null) {
            target.build = build
            target.card = cardRepository.findByIdOrNull(source.cardId)
                ?: throw createRestError("cardId ${source.cardId}")
            target.key = BuildCardsId(build.buildId, source.cardId)
        }
        return target
    }

    private fun createRestError(field: String): RestException {
        return RestException(
            RestError(
                HttpStatus.BAD_REQUEST,
                listOf(
                    issueFactory.createIssue(
                        ConstantesMessages.MSG_INVALID,
                        field,
                        detail = ConstantesMessages.MSG_NOT_EXIST
                    )
                )
            )
        )
    }

    abstract fun fromDto(source: List<BuildCardsDto>, @Context build: Build): List<BuildCards>

}