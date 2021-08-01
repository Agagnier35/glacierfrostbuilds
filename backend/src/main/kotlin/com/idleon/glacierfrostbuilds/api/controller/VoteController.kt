package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.validator.RecaptchaValidator
import com.idleon.glacierfrostbuilds.domain.repositories.BuildRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

enum class VoteType {
    UPVOTE, DOWNVOTE
}

@RestController
@RequestMapping("/api/v1/builds")
class VoteController @Autowired constructor(
    val buildRepo: BuildRepository,
    val recaptchaValidator: RecaptchaValidator
) {

    @PostMapping("/{buildId}/upvote")
    fun upvoteBuild(
        @PathVariable buildId: String,
        @RequestParam previousVote: VoteType?,
        @RequestParam recaptcha: String?
    ): ResponseEntity<Unit> {
        recaptchaValidator.validateReCaptcha(recaptcha)

        val build = buildRepo.findByIdOrNull(buildId.toInt()) ?: return ResponseEntity.notFound().build()

        if (previousVote === VoteType.UPVOTE) {
            build.upvotes -= 1
        } else {
            build.upvotes += if (previousVote === VoteType.DOWNVOTE) 2 else 1;
        }

        buildRepo.save(build)
        return ResponseEntity.accepted().build()
    }

    @PostMapping("/{buildId}/downvote")
    fun downvoteBuild(
        @PathVariable buildId: String,
        @RequestParam previousVote: VoteType?,
        @RequestParam recaptcha: String?
    ): ResponseEntity<Unit> {
        recaptchaValidator.validateReCaptcha(recaptcha)

        val build = buildRepo.findByIdOrNull(buildId.toInt()) ?: return ResponseEntity.notFound().build()

        if (previousVote === VoteType.DOWNVOTE) {
            build.upvotes += 1
        } else {
            build.upvotes -= if (previousVote === VoteType.UPVOTE) 2 else 1;
        }

        buildRepo.save(build)
        return ResponseEntity.accepted().build()
    }
}