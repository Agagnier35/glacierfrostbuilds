package com.idleon.glacierfrostbuilds.api.validator

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.api.exceptions.RestIssueFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class ValidatorFactory @Autowired constructor(val issueFactory: RestIssueFactory) {
    fun createValidator(objectToValidate: Any): AbstractValidator<*>? {
        if (objectToValidate is BuildDto) {
            return BuildValidator(objectToValidate, issueFactory)
        }
        return null
    }
}