package com.idleon.glacierfrostbuilds.domain.mapper

import com.idleon.glacierfrostbuilds.api.dto.PlayerClassDto
import com.idleon.glacierfrostbuilds.domain.model.PlayerClass
import org.mapstruct.*
import org.springframework.beans.factory.annotation.Autowired

@Mapper(componentModel = "spring", uses = [TalentsMapper::class])
abstract class PlayerClassMapper  {
    @Autowired
    private lateinit var talentsMapper: TalentsMapper

    @Mapping(target = "className", source = "className")
    abstract fun toDto(source: PlayerClass): PlayerClassDto

    @AfterMapping
    fun afterToDto(@MappingTarget target: PlayerClassDto, source: PlayerClass) {
        target.talents = talentsMapper.toDto(source.getAllTalentsForClass());
    }

    abstract fun toDto(source: List<PlayerClass>): List<PlayerClassDto>
}