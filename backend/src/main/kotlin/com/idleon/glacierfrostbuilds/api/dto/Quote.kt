package com.idleon.glacierfrostbuilds.api.dto

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Quote(
    @Id
    @Column(name = "quote_id")
    var quoteId: Int,

    @Column(name = "quote_text")
    var quoteText: String
)