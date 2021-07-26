package com.idleon.glacierfrostbuilds.api.dto


data class TalentsDto(
    var talentId: Int = 0,
    var talentName: String = "",
    var className: String = "",
    var displayTab: Int = 0,
    var displayOrder: Int = 0,
    var description: String = ""
)
