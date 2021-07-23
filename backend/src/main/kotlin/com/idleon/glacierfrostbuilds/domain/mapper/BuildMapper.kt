package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.repositories.PlayerClassRepository
import com.idleon.glacierfrostbuilds.domain.repositories.TagsRepository
import org.mapstruct.*
import org.springframework.beans.factory.annotation.Autowired
import java.util.*
import java.util.stream.Collectors

@Mapper(
    componentModel = "spring",
    imports = [Collectors::class, Collections::class],
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
)
abstract class BuildMapper {
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
            target.playerClass = playerClassRepository.getById(source.playerClass.className)
            target.tags = source.tags.map { tagsRepository.getById(it.tagId) }
            target.talents = buildTalentsMapper.fromDto(source.talents, target)
        }
        return target
    }

    abstract fun fromDto(source: List<BuildDto>): List<Build>
}

