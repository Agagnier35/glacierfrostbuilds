package com.idleon.glacierfrostbuilds.api.dto

data class BuildBubblesDto(
    var bubbleId: Int = 0,
    var group: String = "",
    var order: Int = 0,
    var points: Int? = 0
)
