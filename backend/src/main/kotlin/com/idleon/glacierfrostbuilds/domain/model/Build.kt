package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
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

    @Column(name = "Min_Level")
    var minLevel: String,

    @Column(name = "Max_Level")
    var maxLevel: String,

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "Build_Id")
    var talents: List<BuildTalents> = emptyList(),

    @ManyToOne
    @JoinColumn(name = "Class_Name")
    var playerClass: PlayerClass,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "Build_Tags",
        joinColumns = [JoinColumn(name = "Build_Id")],
        inverseJoinColumns = [JoinColumn(name = "Tag_Id")]
    )
    var tags: List<Tags> = emptyList()
) : Serializable