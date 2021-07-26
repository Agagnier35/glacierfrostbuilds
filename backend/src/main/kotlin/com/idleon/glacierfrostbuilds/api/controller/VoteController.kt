package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.exceptions.RestIssueFactory
import com.idleon.glacierfrostbuilds.domain.model.BuildVotes
import com.idleon.glacierfrostbuilds.domain.model.VoteType
import com.idleon.glacierfrostbuilds.domain.repositories.BuildRepository
import com.idleon.glacierfrostbuilds.domain.repositories.BuildVotesRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/builds")
class VoteController @Autowired constructor(
    val buildRepo: BuildRepository,
    val voteRepo: BuildVotesRepository,
    val issueFactory: RestIssueFactory
) {

    @PostMapping("/{buildId}/upvote")
    fun upvoteBuild(
        @PathVariable buildId: String,
        @AuthenticationPrincipal principal: OAuth2User
    ): ResponseEntity<Unit> {
        val build = buildRepo.findByIdOrNull(buildId.toInt()) ?: return ResponseEntity.notFound().build()

        val previousVote = voteRepo.getVoteForBuildAndUser(buildId.toInt(), principal.name)
        if (previousVote?.voteType === VoteType.UPVOTE) {
            build.upvotes -= 1
            voteRepo.delete(previousVote)
        } else {
            val updatedVote = previousVote ?: BuildVotes(build = build, userName = principal.name)
            build.upvotes += if (previousVote?.voteType === VoteType.DOWNVOTE) 2 else 1;
            updatedVote.voteType = VoteType.UPVOTE
            voteRepo.save(updatedVote)
        }

        buildRepo.save(build)
        return ResponseEntity.accepted().build()
    }

    @PostMapping("/{buildId}/downvote")
    fun downvoteBuild(
        @PathVariable buildId: String,
        @AuthenticationPrincipal principal: OAuth2User
    ): ResponseEntity<Unit> {
        val build = buildRepo.findByIdOrNull(buildId.toInt()) ?: return ResponseEntity.notFound().build()

        val previousVote = voteRepo.getVoteForBuildAndUser(buildId.toInt(), principal.name)
        if (previousVote?.voteType === VoteType.DOWNVOTE) {
            build.upvotes += 1
            voteRepo.delete(previousVote)
        } else {
            val updatedVote =
                previousVote ?: BuildVotes(build = build, userName = principal.name, voteType = VoteType.DOWNVOTE)
            build.upvotes -= if (previousVote?.voteType === VoteType.UPVOTE) 2 else 1;
            updatedVote.voteType = VoteType.DOWNVOTE
            voteRepo.save(updatedVote)
        }

        buildRepo.save(build)
        return ResponseEntity.accepted().build()
    }
}