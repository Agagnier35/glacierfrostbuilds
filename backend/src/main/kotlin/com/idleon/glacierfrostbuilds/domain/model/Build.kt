package com.idleon.glacierfrostbuilds.domain.model

import org.hibernate.annotations.ColumnDefault
import java.io.Serializable
import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Build(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Build_Id")
    var buildId: Int? = null,

    @Column(name = "Build_Name")
    var buildName: String = "",

    @Column(name = "Description")
    var description: String = "",

    @Column(name = "Author")
    var author: String = "",

    @Column(name = "Upvotes")
    var upvotes: Int = 0,

    @Column(name = "Game_Version")
    var gameVersion: String = "",

    @Column(name = "Min_Level")
    var minLevel: Int = 0,

    @Column(name = "Max_Level")
    var maxLevel: Int = 0,

    @Column(name = "deprecated")
    @ColumnDefault("false")
    var deprecated: Boolean? = false,

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "build", cascade = [CascadeType.ALL])
    var talents: List<BuildTalents> = arrayListOf(),

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "build", cascade = [CascadeType.ALL])
    var cards: List<BuildCards> = arrayListOf(),

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "build", cascade = [CascadeType.ALL])
    var bubbles: List<BuildBubbles> = arrayListOf(),

    @ManyToOne
    @JoinColumn(name = "Class_Name")
    var playerClass: PlayerClass = PlayerClass(),

    @ManyToOne
    @JoinColumn(name = "Card_Set", referencedColumnName = "Card_category")
    var cardSet: CardCategory? = null,

    @ManyToMany(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinTable(
        name = "Build_Tags",
        joinColumns = [JoinColumn(name = "Build_Id")],
        inverseJoinColumns = [JoinColumn(name = "Tag_Id")],
    )
    var tags: List<Tags> = arrayListOf(),

    @Column(name = "timestamp_creation")
    var timestampCreation: LocalDateTime = LocalDateTime.now(),
) : Serializable