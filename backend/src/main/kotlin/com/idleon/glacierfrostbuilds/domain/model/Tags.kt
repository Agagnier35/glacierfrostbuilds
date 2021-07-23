package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Tags(
    @Id
    @Column(name = "Tag_Id")
    var tagId: Int = 0,

    @Column(name = "Tag_Name")
    var tagName: String = "",

    @Column(name = "Category")
    var category: String = ""
) : Serializable
