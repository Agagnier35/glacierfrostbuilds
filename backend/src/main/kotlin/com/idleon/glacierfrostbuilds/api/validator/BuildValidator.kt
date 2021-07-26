package com.idleon.glacierfrostbuilds.api.validator

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.api.exceptions.RestIssueFactory
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_INVALID
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_NOT_BLANK
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_NOT_GREATER_THAN_0
import com.idleon.glacierfrostbuilds.utils.ConstantesMessages.MSG_TOO_LONG

class BuildValidator(private val build: BuildDto, private val issueFactory: RestIssueFactory) :
    AbstractValidator<BuildDto>() {

    override fun doValidate() {
        validateBuildName()
        validateDescription()
        validateGameVersion()
        validateMaxLevel()
        validateMinLevel()
        validateClassName()
        validateTalents()
    }

    private fun validateBuildName() {
        if (build.buildName.isBlank()) {
            problem.addIssue(
                issueFactory.createIssue(
                    MSG_INVALID, "buildName", detail = MSG_NOT_BLANK
                )
            )
        } else if (build.buildName.length > 255) {
            problem.addIssue(
                issueFactory.createIssue(
                    MSG_INVALID, "buildName", detail = MSG_TOO_LONG, meta = hashMapOf(Pair("limit", 255))
                )
            )
        }
    }

    private fun validateDescription() {
        if (build.description != null && build.description.length > 1024) {
            problem.addIssue(
                issueFactory.createIssue(
                    MSG_INVALID, "description", detail = MSG_TOO_LONG, meta = hashMapOf(Pair("limit", 1024))
                )
            )
        }
    }

    private fun validateGameVersion() {
        if (build.gameVersion.isBlank()) {
            problem.addIssue(issueFactory.createIssue(MSG_INVALID, "gameVersion", detail = MSG_NOT_BLANK))
        } else if (build.buildName.length > 50) {
            problem.addIssue(
                issueFactory.createIssue(
                    MSG_INVALID, "gameVersion", detail = MSG_TOO_LONG, meta = hashMapOf(Pair("limit", 50))
                )
            )
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

    private fun validateTalents() {
        build.talents.forEach {
            if (it.comments != null && it.comments.length > 1024)
                problem.addIssue(
                    issueFactory.createIssue(
                        MSG_INVALID,
                        "talent ${it.talentId}",
                        detail = MSG_TOO_LONG,
                        meta = hashMapOf(Pair("limit", 1024))
                    )
                )
        }

    }
}