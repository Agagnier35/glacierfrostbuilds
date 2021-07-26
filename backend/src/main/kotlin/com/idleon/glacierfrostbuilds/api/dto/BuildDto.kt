package com.idleon.glacierfrostbuilds.api.dto

import com.idleon.glacierfrostbuilds.domain.model.VoteType
import com.idleon.glacierfrostbuilds.utils.Constants.CURRENT_GAME_VERSION
import java.time.LocalDateTime

data class BuildDto(
    val buildId: Int?,
    val buildName: String = "",
    val description: String?,
    val author: String?,
    val upvotes: Int = 0,
    val gameVersion: String = CURRENT_GAME_VERSION,
    val minLevel: Int?,
    val maxLevel: Int?,
    val talents: List<BuildTalentsDto> = arrayListOf(),
    val playerClass: PlayerClassDto = PlayerClassDto(),
    val tags: List<TagsDto> = arrayListOf(),
    val userVote: VoteType?,
    val timestampCreation: LocalDateTime = LocalDateTime.now()
)
