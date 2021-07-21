package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.domain.model.Talents
import com.idleon.glacierfrostbuilds.domain.repositories.TalentsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping( "/api/v1/talents")
class TalentsController @Autowired constructor(val repo: TalentsRepository) {

    @GetMapping()
    fun getTalents(): Iterable<Talents> {
        return repo.findAll()
    }
}