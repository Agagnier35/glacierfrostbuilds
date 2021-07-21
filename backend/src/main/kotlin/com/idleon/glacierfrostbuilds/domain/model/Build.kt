package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import java.util.Collections.emptyIterator
import java.util.Collections.emptyList
import javax.persistence.*

@Entity
class Build(
        @Id
        @GeneratedValue
        @Column(name = "Build_Id")
        var buildId: Int? = null,

        @Column(name = "Build_Name")
        var buildName: String,

        @Column(name = "Description")
        var description: String,

        @Column(name = "Author")
        var author: String,

        @Column(name = "Upvotes")
        var upvotes: Int = 0,

        @Column(name = "Game_Version")
        var gameVersion: String,

        @OneToMany(mappedBy = "build")
        var talents: List<BuildTalents> = emptyList()
) : Serializable