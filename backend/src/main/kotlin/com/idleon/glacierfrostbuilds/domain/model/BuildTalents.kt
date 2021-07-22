package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
@IdClass(BuildTalentsId::class)
class BuildTalents(
    @Id
    @Column(name = "Build_Id")
    val buildId: Int,

    @Id
    @Column(name = "Talent_Id")
    val talentId: Int,

    @Column(name = "Points")
    var points: Int = 0,

    @Column(name = "Comments")
    var comments: String?,
) : Serializable


data class BuildTalentsId(
    val buildId: Int,
    val talentId: Int
) : Serializable