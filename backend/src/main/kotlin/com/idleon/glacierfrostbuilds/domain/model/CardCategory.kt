package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class CardCategory(
    @Id
    @Column(name = "Card_category")
    var cardCategory: String = "",

    @Column(name = "Set_effect")
    var setEffect: String = "",

    @Column(name = "Category_order")
    var categoryOrder: Int = 0,
) : Serializable