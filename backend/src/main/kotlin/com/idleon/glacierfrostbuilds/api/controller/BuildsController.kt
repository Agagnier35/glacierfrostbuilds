package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.domain.mapper.BuildMapper
import com.idleon.glacierfrostbuilds.domain.repositories.BuildRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/builds")
class BuildsController @Autowired constructor(val repo: BuildRepository, val mapper: BuildMapper) {
    @GetMapping()
    fun getBuilds(): ResponseEntity<List<BuildDto>> {
        return ResponseEntity.ok(mapper.toDto(repo.findAll()))
    }

    @PostMapping()
    fun createBuilds(@RequestBody build: BuildDto): ResponseEntity<BuildDto> {
        return ResponseEntity.ok(mapper.toDto(repo.save(mapper.fromDto(build))))
    }
}