package com.idleon.glacierfrostbuilds.api.exceptions

import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.AuthenticationException
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
            RestError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                listOf(
                    RestIssue(
                        ex.javaClass.name,
                        "The dev fucked up badly, contact him and send this timestamp: ${
                            LocalDateTime.now().toString()
                        }" ?: ""
                    )
                )
            )
        }
        logger.error(ex) { "Exception" }

        return ResponseEntity.status(error.status).body(error)
    }

    @ExceptionHandler(AuthenticationException::class)
    fun handleAuthEx(ex: Exception, request: WebRequest): ResponseEntity<RestError> {
        val error = RestError(
            HttpStatus.UNAUTHORIZED,
            listOf(RestIssue(AuthenticationException::class.simpleName!!, "Auth failure"))
        )

        logger.error(ex) { "Auth failure: " }

        return ResponseEntity.status(error.status).body(error)
    }
}