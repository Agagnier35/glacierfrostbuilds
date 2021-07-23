package com.idleon.glacierfrostbuilds.api.dto


data class TalentsDto(
    var talentId: Int,
    var talentName: String,
    var className: String,
    var displayTab: Int,
    var displayOrder: Int,
    var description: String
)
