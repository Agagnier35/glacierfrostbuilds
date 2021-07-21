package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
class BuildTalents(
        @EmbeddedId
        var key: BuildTalentsId,

        @Column(name = "Points")
        var points: Int = 0,

        @Column(name = "Comments")
        var comments: String?,

        @ManyToOne
        @JoinColumn(name = "Build_Id")
        @MapsId("buildId")
        var build: Build,

        @ManyToOne
        @JoinColumn(name = "Talent_Id")
        @MapsId("talentId")
        var talent: Talents
) : Serializable

@Embeddable
class BuildTalentsId(
        val buildId: Int,
        val talentId: Int
): Serializable