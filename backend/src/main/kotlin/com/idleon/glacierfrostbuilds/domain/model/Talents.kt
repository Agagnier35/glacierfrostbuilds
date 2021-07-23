package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "Talents")
data class Talents(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Talent_Id")
    var talentId: Int? = null,

    @Column(name = "Talent_Name")
    var talentName: String = "",

    @ManyToOne
    @JoinColumn(name = "Class_Name")
    var playerClass: PlayerClass = PlayerClass(),

    @Column(name = "Display_Tab")
    var displayTab: String = "",

    @Column(name = "Display_Order")
    var displayOrder: String = "",

    @Column(name = "Description")
    var description: String = ""
) : Serializable