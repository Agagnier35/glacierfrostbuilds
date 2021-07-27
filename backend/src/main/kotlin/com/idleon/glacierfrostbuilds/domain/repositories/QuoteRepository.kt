package com.idleon.glacierfrostbuilds.domain.repositories

import com.idleon.glacierfrostbuilds.api.dto.Quote
import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.model.Tags
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface QuoteRepository : JpaRepository<Quote, Int> {
    @Query("SELECT * FROM dbo.quote ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    fun getRandomQuote(): Quote
}