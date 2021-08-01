package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.dto.AlchemyBubbleDto
import com.idleon.glacierfrostbuilds.domain.mapper.AlchemyBubbleMapper
import com.idleon.glacierfrostbuilds.domain.repositories.AlchemyBubbleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/bubbles")
class BubblesController @Autowired constructor(val repo: AlchemyBubbleRepository, val mapper: AlchemyBubbleMapper) {
    @GetMapping()
    fun getBubbles(): ResponseEntity<List<AlchemyBubbleDto>> {
        return ResponseEntity.ok(mapper.toDto(repo.findAll()))
    }
}