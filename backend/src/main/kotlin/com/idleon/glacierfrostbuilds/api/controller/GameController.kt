package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.domain.repositories.QuoteRepository
import com.idleon.glacierfrostbuilds.utils.Constants.CURRENT_GAME_VERSION
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
class GameController @Autowired constructor(val quoteRepository: QuoteRepository) {
    @GetMapping(value = ["/version"], produces = ["plain/text"])
    fun getCurrentGameVersion(): ResponseEntity<String> {
        return ResponseEntity.ok(CURRENT_GAME_VERSION)
    }

    @GetMapping(value = ["/quote"], produces = ["plain/text"])
    fun getFunnieQuote(): ResponseEntity<String> {
        return ResponseEntity.ok(quoteRepository.getRandomQuote().quoteText)
    }
}