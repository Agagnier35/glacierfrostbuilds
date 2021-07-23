package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.api.exceptions.RestError
import com.idleon.glacierfrostbuilds.api.exceptions.RestException
import com.idleon.glacierfrostbuilds.api.exceptions.RestIssueFactory
import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.repositories.PlayerClassRepository
import com.idleon.glacierfrostbuilds.domain.repositories.TagsRepository
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_INVALID
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_NOT_EXIST
import org.mapstruct.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import java.util.*
import java.util.stream.Collectors


@Mapper(
    componentModel = "spring",
    imports = [Collectors::class, Collections::class],
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
)
abstract class BuildMapper {
    @Autowired
    protected lateinit var issueFactory: RestIssueFactory

    @Autowired
    protected lateinit var playerClassMapper: PlayerClassMapper

    @Autowired
    protected lateinit var tagsMapper: TagsMapper

    @Autowired
    protected lateinit var buildTalentsMapper: BuildTalentsMapper

    @Autowired
    protected lateinit var tagsRepository: TagsRepository

    @Autowired
    protected lateinit var playerClassRepository: PlayerClassRepository


    @Mappings(
        Mapping(target = "tags", expression = "java(tagsMapper.toDto(source.getTags()))"),
        Mapping(target = "playerClass", expression = "java(playerClassMapper.toDto(source.getPlayerClass()))"),
        Mapping(target = "talents", expression = "java(buildTalentsMapper.toDto(source.getTalents()))")
    )
    abstract fun toDto(source: Build): BuildDto
    abstract fun toDto(source: List<Build>): List<BuildDto>


    @Mappings(
        Mapping(target = "playerClass", ignore = true),
        Mapping(target = "tags", ignore = true),
        Mapping(target = "talents", ignore = true)
    )
    abstract fun fromDto(source: BuildDto): Build

    @AfterMapping
    fun afterFromDto(source: BuildDto, @MappingTarget target: Build?): Build? {
        if (target != null) {
            target.playerClass =
                playerClassRepository.findByIdOrNull(source.playerClass.className)
                    ?: throw createRestError("playerClass")

            target.tags = source.tags.map {
                tagsRepository.findByIdOrNull(it.tagId) ?: throw createRestError("tags ${it.tagId}")

            }
            target.talents = buildTalentsMapper.fromDto(source.talents, target)
        }
        return target
    }

    private fun createRestError(field: String): RestException {
        return RestException(
            RestError(
                HttpStatus.BAD_REQUEST, listOf(issueFactory.createIssue(MSG_INVALID, field, detail = MSG_NOT_EXIST))
            )
        )
    }

    abstract fun fromDto(source: List<BuildDto>): List<Build>
}

