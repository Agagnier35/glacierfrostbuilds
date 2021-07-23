package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
data class BuildTalents(
    @EmbeddedId
    var key: BuildTalentsId = BuildTalentsId(),

    @Column(name = "Points")
    var points: Int = 0,

    @Column(name = "Comments")
    var comments: String? = null,

    @ManyToOne
    @MapsId("buildId")
    @JoinColumn(name = "Build_Id")
    var build: Build = Build(),

    @ManyToOne
    @MapsId("talentId")
    @JoinColumn(name = "Talent_Id")
    var talent: Talents = Talents()
) : Serializable


@Embeddable
data class BuildTalentsId(
    val buildId: Int? = null,
    val talentId: Int? = null
) : Serializable