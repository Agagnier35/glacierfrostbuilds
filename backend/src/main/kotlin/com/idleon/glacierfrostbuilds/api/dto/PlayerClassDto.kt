package com.idleon.glacierfrostbuilds.api.dto


data class PlayerClassDto(
    var className: String = "",
    var talents: List<TalentsDto> = arrayListOf()
)