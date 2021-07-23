package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.BuildTalentsDto
import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.model.BuildTalents
import com.idleon.glacierfrostbuilds.domain.model.BuildTalentsId
import com.idleon.glacierfrostbuilds.domain.repositories.TalentsRepository
import org.mapstruct.*
import org.springframework.beans.factory.annotation.Autowired

@Mapper(
    componentModel = "spring", uses = [TalentsRepository::class],
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT
)
abstract class BuildTalentsMapper {
    @Autowired
    protected lateinit var talentsRepository: TalentsRepository


    @Mapping(target = "talentId", expression = "java(source.getKey().getTalentId())")
    abstract fun toDto(source: BuildTalents): BuildTalentsDto
    abstract fun toDto(source: List<BuildTalents>): List<BuildTalentsDto>

    @Mappings(
        Mapping(target = "key", ignore = true),
        Mapping(target = "talent", ignore = true),
        Mapping(target = "build", ignore = true)
    )
    abstract fun fromDto(source: BuildTalentsDto, @Context build: Build): BuildTalents

    @AfterMapping
    fun afterFromDto(
        source: BuildTalentsDto,
        @MappingTarget target: BuildTalents?,
        @Context build: Build
    ): BuildTalents? {
        if (target != null) {
            target.build = build
            target.talent = talentsRepository.getById(source.talentId)
            target.key = BuildTalentsId(build.buildId, source.talentId)
        }
        return target
    }

    abstract fun fromDto(source: List<BuildTalentsDto>, @Context build: Build): List<BuildTalents>

}