package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.PlayerClassDto
import com.idleon.glacierfrostbuilds.domain.model.PlayerClass
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.NullValueMappingStrategy
import org.springframework.beans.factory.annotation.Autowired

@Mapper(
    componentModel = "spring", uses = [TalentsMapper::class],
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
)
abstract class PlayerClassMapper {
    @Autowired
    protected lateinit var talentsMapper: TalentsMapper

    @Mapping(target = "talents", expression = "java(talentsMapper.toDto(source.obtainAllTalentsForClass()))")
    abstract fun toDto(source: PlayerClass): PlayerClassDto

    @Mapping(target = "talents", ignore = true)
    abstract fun toDtoNoTalents(source: PlayerClass): PlayerClassDto

    @Mapping(target = "talents", ignore = true)
    abstract fun fromDto(source: PlayerClassDto): PlayerClass
}