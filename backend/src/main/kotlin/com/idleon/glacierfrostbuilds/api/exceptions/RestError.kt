package com.idleon.glacierfrostbuilds.api.exceptions

import org.springframework.http.HttpStatus
import java.time.LocalDateTime


class RestException(val error: RestError) : Exception()

data class RestError(
    val status: HttpStatus,
    val code: String,
    val errors: List<RestIssue> = arrayListOf()
)

data class RestIssue(
    val code: String,
    val details: String,
    val timestamp: LocalDateTime,
)
