package com.idleon.glacierfrostbuilds.api.dto

data class BuildCardsDto(
    var cardId: Int = 0,
    var card: CardDto?,
    var group: String = "",
    var order: Int = 0
)
