package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.dto.CardCategoryDto
import com.idleon.glacierfrostbuilds.api.dto.CardDto
import com.idleon.glacierfrostbuilds.domain.mapper.CardCategoryMapper
import com.idleon.glacierfrostbuilds.domain.mapper.CardsMapper
import com.idleon.glacierfrostbuilds.domain.repositories.CardCategoryRepository
import com.idleon.glacierfrostbuilds.domain.repositories.CardRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/cards")
class CardsController @Autowired constructor(val repo: CardRepository, val mapper: CardsMapper, val repoCategory: CardCategoryRepository, val mapperCategory: CardCategoryMapper) {
    @GetMapping()
    fun getCards(): ResponseEntity<List<CardDto>> {
        return ResponseEntity.ok(mapper.toDto(repo.findAll()))
    }

    @GetMapping("/categories")
    fun getCardsCategory(): ResponseEntity<List<CardCategoryDto>> {
        return ResponseEntity.ok(mapperCategory.toDto(repoCategory.findAll()))
    }
}