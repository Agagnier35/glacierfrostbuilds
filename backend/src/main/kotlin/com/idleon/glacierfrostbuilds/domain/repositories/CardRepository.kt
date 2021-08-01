package com.idleon.glacierfrostbuilds.domain.repositories

import com.idleon.glacierfrostbuilds.domain.model.Card
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CardRepository : JpaRepository<Card, Int> {
}