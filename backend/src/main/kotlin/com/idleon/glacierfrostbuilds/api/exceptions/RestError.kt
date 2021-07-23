package com.idleon.glacierfrostbuilds.api.exceptions

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.util.*


class RestException(val error: RestError) : Exception() {
    override val message: String?
        get() = buildRestExceptionMessage()

    private fun buildRestExceptionMessage(): String? {
        return error.issues.joinToString(separator = "|") { it.code }
    }
}

data class RestError(
    val status: HttpStatus,
    var issues: List<RestIssue> = arrayListOf()
) {
    val code: String = status.reasonPhrase

    fun addIssue(issue: RestIssue) {
        issues += issue
    }
}

data class RestIssue(
    val code: String,
    val details: String = "",
    val field: String? = null,
    val timestamp: LocalDateTime = LocalDateTime.now(),
    val meta: Map<String, Any> = hashMapOf()
)

@Component
class RestIssueFactory @Autowired constructor(val messageSource: MessageSource) {
    fun createIssue(
        code: String,
        field: String?,
        meta: Map<String, Any> = hashMapOf(),
        local: Locale = Locale.CANADA,
        detail: String? = null
    ): RestIssue {
        return RestIssue(code, messageSource.getMessage(detail ?: code, null, local), field, meta = meta)
    }
}
