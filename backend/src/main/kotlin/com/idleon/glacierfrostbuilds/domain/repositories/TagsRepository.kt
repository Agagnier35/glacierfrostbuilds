package com.idleon.glacierfrostbuilds.domain.repositories

import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.model.Tags
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TagsRepository : JpaRepository<Tags, Int> {
}