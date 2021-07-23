package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.dto.TagsDto
import com.idleon.glacierfrostbuilds.domain.mapper.TagsMapper
import com.idleon.glacierfrostbuilds.domain.repositories.TagsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/tags")
class TagsController @Autowired constructor(val repo: TagsRepository, val mapper: TagsMapper) {
    @GetMapping()
    fun getTags(): ResponseEntity<List<TagsDto>> {
        return ResponseEntity.ok(mapper.toDto(repo.findAll()))
    }
}