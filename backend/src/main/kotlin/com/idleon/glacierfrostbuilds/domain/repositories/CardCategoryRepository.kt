package com.idleon.glacierfrostbuilds.domain.repositories

import com.idleon.glacierfrostbuilds.domain.model.CardCategory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CardCategoryRepository : JpaRepository<CardCategory, String> {
}