package com.idleon.glacierfrostbuilds.domain.repositories

import com.idleon.glacierfrostbuilds.domain.model.Build
import com.idleon.glacierfrostbuilds.domain.model.BuildVotes
import com.idleon.glacierfrostbuilds.domain.model.Tags
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface BuildVotesRepository : JpaRepository<BuildVotes, Int> {
    @Query("SELECT v FROM BuildVotes v WHERE v.build.buildId=?1 AND v.userName=?2")
    fun getVoteForBuildAndUser(buildId:Int, user:String?):BuildVotes?
}