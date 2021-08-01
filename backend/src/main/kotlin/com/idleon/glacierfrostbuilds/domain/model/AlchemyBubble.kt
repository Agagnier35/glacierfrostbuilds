package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class AlchemyBubble(
    @Id
    @Column(name = "Bubble_Id")
    var bubbleId: Int = 0,

    @Column(name = "Bubble_Name")
    var name: String = "",

    @Column(name = "Bubble_Effect")
    var effect: String = "",

    @Column(name = "Bubble_number")
    var bubbleNumber: Int = 0,

    @Column(name = "Bubble_category")
    var category: String = "",
) : Serializable