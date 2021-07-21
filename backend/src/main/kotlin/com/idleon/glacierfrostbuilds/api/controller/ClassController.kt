package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.domain.mapper.PlayerClassMapper
import com.idleon.glacierfrostbuilds.api.dto.PlayerClassDto
import com.idleon.glacierfrostbuilds.domain.repositories.PlayerClassRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/classes")
class ClassController @Autowired constructor(val repo: PlayerClassRepository, val classMapper: PlayerClassMapper) {

    @GetMapping()
    fun getPlayerClasses(): ResponseEntity<List<PlayerClassDto>> {
        return ResponseEntity.ok(classMapper.toDto(repo.findAll()));
    }

    @GetMapping("/{className}")
    fun getPlayerClassOfName(@PathVariable className: String): ResponseEntity<PlayerClassDto> {
        val playerClass = repo.findById(className)
        return if (playerClass.isPresent) ResponseEntity.ok(classMapper.toDto(playerClass.get()))
        else ResponseEntity.notFound().build()
    }
}