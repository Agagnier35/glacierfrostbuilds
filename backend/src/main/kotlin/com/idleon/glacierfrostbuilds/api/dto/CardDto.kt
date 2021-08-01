package com.idleon.glacierfrostbuilds.api.dto


data class CardDto(
    var cardId: Int = 0,
    var name: String = "",
    var effect: String = "",
    var category: CardCategoryDto = CardCategoryDto(),
)
