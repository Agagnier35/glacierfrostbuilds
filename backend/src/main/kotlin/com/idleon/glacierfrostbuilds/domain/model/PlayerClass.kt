package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.*

@Entity
data class PlayerClass(
    @Id
    @Column(name = "Class_Name")
    var className: String = "",

    @ManyToOne
    @JoinColumn(name = "Parent_Class", referencedColumnName = "Class_Name")
    var parentClass: PlayerClass? = null,

    @OneToMany(mappedBy = "playerClass", fetch = FetchType.LAZY)
    var talents: List<Talents> = arrayListOf()
) : Serializable {
    fun obtainAllTalentsForClass(): List<Talents> {
        val parentTalents = parentClass?.obtainAllTalentsForClass()?.toMutableList() ?: arrayListOf();
        parentTalents.addAll(talents)
        return parentTalents;
    }
}