package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
data class BuildCards(
    @EmbeddedId
    var key: BuildCardsId = BuildCardsId(),

    @Column(name = "Group_Id")
    var group: String = "",

    @Column(name = "Card_Order")
    var order: Int = 0,

    @ManyToOne
    @MapsId("buildId")
    @JoinColumn(name = "Build_Id")
    var build: Build = Build(),

    @ManyToOne
    @MapsId("cardId")
    @JoinColumn(name = "Card_Id")
    var card: Card = Card()
) : Serializable


@Embeddable
data class BuildCardsId(
    val buildId: Int? = null,
    val cardId: Int? = null
) : Serializable