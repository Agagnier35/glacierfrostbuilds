package com.idleon.glacierfrostbuilds.api.validator

import com.idleon.glacierfrostbuilds.api.exceptions.RestError
import com.idleon.glacierfrostbuilds.api.exceptions.RestException
import org.springframework.http.HttpStatus


abstract class AbstractValidator<T> constructor(
    protected var problem: RestError = RestError(HttpStatus.BAD_REQUEST)
) {

    open fun validate() {
        doValidate()

        if (problem.issues.isNotEmpty()) {
            throw RestException(problem)
        }
    }

    protected abstract fun doValidate()
}