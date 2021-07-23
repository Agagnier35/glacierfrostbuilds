package com.idleon.glacierfrostbuilds.api.validator

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.api.exceptions.RestIssueFactory
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_INVALID
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_NOT_BLANK
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_NOT_GREATER_THAN_0
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_NOT_LOGGED_IN

class BuildValidator(private val build: BuildDto, private val issueFactory: RestIssueFactory) :
    AbstractValidator<BuildDto>() {

    override fun doValidate() {
        validateBuildName()
        validateAuthor()
        validateGameVersion()
        validateMaxLevel()
        validateMinLevel()
        validateClassName()
    }

    private fun validateBuildName() {
        if (build.buildName.isBlank()) {
            problem.addIssue(
                issueFactory.createIssue(
                    MSG_INVALID, "buildName", detail = MSG_NOT_BLANK
                )
            )
        }
    }

    private fun validateAuthor() {
        if (build.author.isBlank()) {
            problem.addIssue(issueFactory.createIssue(MSG_NOT_LOGGED_IN, "author"))
        }
    }

    private fun validateGameVersion() {
        if (build.gameVersion.isBlank()) {
            problem.addIssue(issueFactory.createIssue(MSG_INVALID, "gameVersion", detail = MSG_NOT_BLANK))
        }
    }

    private fun validateMaxLevel() {
        if (build.maxLevel?.let { it < 0 } == true) {
            problem.addIssue(issueFactory.createIssue(MSG_INVALID, "maxLevel", detail = MSG_NOT_GREATER_THAN_0))
        }
    }

    private fun validateMinLevel() {
        if (build.minLevel?.let { it < 0 } == true) {
            problem.addIssue(issueFactory.createIssue(MSG_INVALID, "minLevel", detail = MSG_NOT_GREATER_THAN_0))
        }
    }

    private fun validateClassName() {
        if (build.playerClass.className.isBlank()) {
            problem.addIssue(issueFactory.createIssue(MSG_INVALID, "playerClass", detail = MSG_NOT_BLANK))
        }
    }
}