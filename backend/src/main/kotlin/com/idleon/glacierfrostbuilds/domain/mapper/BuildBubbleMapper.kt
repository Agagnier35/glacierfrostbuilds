package com.idleon.glacierfrostbuilds.domain.mapper


import com.idleon.glacierfrostbuilds.api.dto.BuildBubblesDto
import com.idleon.glacierfrostbuilds.api.exceptions.RestError
import com.idleon.glacierfrostbuilds.api.exceptions.RestException
import com.idleon.glacierfrostbuilds.api.exceptions.RestIssueFactory
import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.model.BuildBubbles
import com.idleon.glacierfrostbuilds.domain.model.BuildBubblesId
import com.idleon.glacierfrostbuilds.domain.repositories.AlchemyBubbleRepository
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages
import org.mapstruct.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus

@Mapper(
    componentModel = "spring", uses = [AlchemyBubbleRepository::class],
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT
)
abstract class BuildBubbleMapper {
    @Autowired
    protected lateinit var bubbleRepository: AlchemyBubbleRepository

    @Autowired
    protected lateinit var issueFactory: RestIssueFactory


    @Mapping(target = "bubbleId", expression = "java(source.getKey().getBubbleId())")
    abstract fun toDto(source: BuildBubbles): BuildBubblesDto
    abstract fun toDto(source: List<BuildBubbles>): List<BuildBubblesDto>

    @Mappings(
        Mapping(target = "key", ignore = true),
        Mapping(target = "bubble", ignore = true),
        Mapping(target = "build", ignore = true)
    )
    abstract fun fromDto(source: BuildBubblesDto, @Context build: Build): BuildBubbles

    @AfterMapping
    fun afterFromDto(
        source: BuildBubblesDto,
        @MappingTarget target: BuildBubbles?,
        @Context build: Build
    ): BuildBubbles? {
        if (target != null) {
            target.build = build
            target.bubble = bubbleRepository.findByIdOrNull(source.bubbleId)
                ?: throw createRestError("bubbleId ${source.bubbleId}")
            target.key = BuildBubblesId(build.buildId, source.bubbleId)
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

    abstract fun fromDto(source: List<BuildBubblesDto>, @Context build: Build): List<BuildBubbles>

}