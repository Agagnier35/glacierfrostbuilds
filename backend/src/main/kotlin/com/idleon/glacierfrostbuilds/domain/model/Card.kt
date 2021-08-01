package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
data class Card(
    @Id
    @Column(name = "Card_Id")
    var cardId: Int = 0,

    @Column(name = "Card_Name")
    var name: String = "",

    @Column(name = "Card_Effect")
    var effect: String = "",

    @ManyToOne
    @JoinColumn(name = "Card_category")
    var category: CardCategory = CardCategory(),
) : Serializable