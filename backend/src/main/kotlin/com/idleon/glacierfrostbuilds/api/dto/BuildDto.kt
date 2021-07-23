package com.idleon.glacierfrostbuilds.api.dto

data class BuildDto(
    val buildId: Int?,
    val buildName: String,
    val description: String?,
    val author: String,
    val upvotes: Int,
    val gameVersion: String,
    val minLevel: Int?,
    val maxLevel: Int?,
    val talents: List<BuildTalentsDto> = arrayListOf(),
    val playerClass: PlayerClassDto,
    val tags: List<TagsDto> = arrayListOf()
)
