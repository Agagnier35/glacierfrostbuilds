package com.idleon.glacierfrostbuilds.domain.repositories

import com.idleon.glacierfrostbuilds.domain.model.Build
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface BuildRepository : JpaRepository<Build, Int>, JpaSpecificationExecutor<Build> {
}