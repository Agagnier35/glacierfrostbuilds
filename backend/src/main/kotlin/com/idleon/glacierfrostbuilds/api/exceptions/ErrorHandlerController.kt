package com.idleon.glacierfrostbuilds.api.exceptions

import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.context.request.WebRequest
import java.time.LocalDateTime

@ControllerAdvice
@RequestMapping(produces = [MediaType.APPLICATION_JSON_VALUE])
class ErrorHandlerController {
    private val logger = KotlinLogging.logger {}

    @ExceptionHandler(Exception::class)
    fun handleException(ex: Exception, request: WebRequest): ResponseEntity<RestError> {
        val error = if (ex is RestException) ex.error
        else {
            val errors =
                RestIssue(ex.javaClass.name, ex.message ?: "See logs", LocalDateTime.now())
            RestError(HttpStatus.INTERNAL_SERVER_ERROR, "UnknownUnexpectedError", listOf(errors))
        }
        logger.error(ex) { "Exception" }

        return ResponseEntity.status(error.status).body(error)
    }
}