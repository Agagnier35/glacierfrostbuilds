package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "Talents")
class Talents(
        @Id @GeneratedValue @Column(name = "Talent_Id")
        var talentId: Int? = null,

        @Column(name = "Talent_Name")
        var talentName: String,

        @ManyToOne @JoinColumn(name = "Class_Name")
        var className: PlayerClass,

        @Column(name = "Display_Tab")
        var displayTab: String,

        @Column(name = "Description")
        var description: String
) : Serializable