package com.idleon.glacierfrostbuilds.domain.repositories

import com.idleon.glacierfrostbuilds.domain.model.PlayerClass
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface PlayerClassRepository : JpaRepository<PlayerClass, String> {
    @Query("SELECT c.className FROM PlayerClass c")
    fun getAllClassNames(): List<String>
}