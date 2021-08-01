package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
data class BuildBubbles(
    @EmbeddedId
    var key: BuildBubblesId = BuildBubblesId(),

    @Column(name = "Group_Id")
    var group: String = "",

    @Column(name = "Bubble_Order")
    var order: Int = 0,

    @Column(name = "points")
    var points: Int? = 0,

    @ManyToOne
    @MapsId("buildId")
    @JoinColumn(name = "Build_Id")
    var build: Build = Build(),

    @ManyToOne
    @MapsId("bubbleId")
    @JoinColumn(name = "Bubble_Id")
    var bubble: AlchemyBubble = AlchemyBubble()
) : Serializable


@Embeddable
data class BuildBubblesId(
    val buildId: Int? = null,
    val bubbleId: Int? = null
) : Serializable