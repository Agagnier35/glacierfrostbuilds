package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.api.validator.ValidatorFactory
import com.idleon.glacierfrostbuilds.domain.mapper.BuildMapper
import com.idleon.glacierfrostbuilds.domain.repositories.BuildRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/builds")
class BuildsController @Autowired constructor(
    val repo: BuildRepository,
    val mapper: BuildMapper,
    val validatorFactory: ValidatorFactory
) {
    @GetMapping()
    fun getBuilds(): ResponseEntity<List<BuildDto>> {
        return ResponseEntity.ok(mapper.toDto(repo.findAll()))
    }

    @PostMapping()
    fun createBuilds(@RequestBody build: BuildDto): ResponseEntity<BuildDto> {
        validatorFactory.createValidator(build)?.validate()
        val savedBuild = repo.save(mapper.fromDto(build))
        return ResponseEntity.ok(mapper.toDto(savedBuild))
    }
}