package com.idleon.glacierfrostbuilds.domain.model

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class Tags(
    @Id
    @Column(name = "Tag_Id")
    var tag_Id: String,

    @Column(name = "Tag_Name")
    var tag_Name: String,

    @Column(name = "Category")
    var category: String
) : Serializable
