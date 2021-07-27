package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.api.dto.BuildDto
import com.idleon.glacierfrostbuilds.api.dto.BuildListDto
import com.idleon.glacierfrostbuilds.api.validator.ValidatorFactory
import com.idleon.glacierfrostbuilds.domain.mapper.BuildMapper
import com.idleon.glacierfrostbuilds.domain.model.*
import com.idleon.glacierfrostbuilds.domain.repositories.BuildRepository
import com.idleon.glacierfrostbuilds.domain.repositories.BuildVotesRepository
import com.idleon.glacierfrostbuilds.utils.getNameFromPrincipal
import com.idleon.glacierfrostbuilds.utils.UnpagedSort
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.*
import javax.persistence.criteria.Predicate

@RestController
@RequestMapping("/api/v1/builds")
class BuildsController @Autowired constructor(
    val repo: BuildRepository,
    val voteRepo: BuildVotesRepository,
    val mapper: BuildMapper,
    val validatorFactory: ValidatorFactory
) {
    @GetMapping()
    fun getBuilds(
        @RequestParam pageNumber: Int?,
        @RequestParam pageSize: Int?,
        @RequestParam sortBy: String?,
        @RequestParam sortDirection: Sort.Direction?,
        @RequestParam buildName: String?,
        @RequestParam author: String?,
        @RequestParam className: String?,
        @RequestParam tags: String?,
        @RequestParam gameVersion: String?,
        @AuthenticationPrincipal principal: OAuth2User?
    ): ResponseEntity<BuildListDto> {
        val sort = Sort.by(sortDirection ?: Sort.Direction.DESC, validateSort(sortBy))
        val page = if (pageNumber != null && pageSize != null)
            PageRequest.of(pageNumber, pageSize, sort)
        else
            UnpagedSort(sort)

        val buildResults = repo.findAll({ root, query, criteriaBuilder ->
            val predicates = arrayListOf<Predicate>()
            buildName?.let { it ->
                predicates += criteriaBuilder.like(criteriaBuilder.upper(root.get("buildName")), "%${it.uppercase()}%")
            }
            author?.let { it ->
                predicates += criteriaBuilder.like(criteriaBuilder.upper(root.get("author")), "%${it.uppercase()}%")
            }
            gameVersion?.let { it ->
                predicates += criteriaBuilder.equal(root.get<String>("gameVersion"), it)
            }

            className?.let { it ->
                val playerClass = root.join<Build, PlayerClass>("playerClass")
                predicates += criteriaBuilder.equal(playerClass.get<String>("className"), it)
            }

            tags?.let { it ->
                val tagsJoins = root.join<Build, Tags>("tags")
                predicates += tagsJoins.get<String>("tagId").`in`(it.split(","))
            }
            query.where(*predicates.toTypedArray())
            query.restriction
        }, page)

        return ResponseEntity.ok(
            BuildListDto(
                mapper.toDto(buildResults.content, false, getNameFromPrincipal(principal)),
                buildResults.totalElements,
                buildResults.totalPages
            )
        )

    }

    @GetMapping("/count")
    fun getBuildsCount(): ResponseEntity<Long> {
        return ResponseEntity.ok(repo.count())
    }

    @GetMapping("/{id}")
    fun getBuildsWithId(
        @PathVariable id: String,
        @AuthenticationPrincipal principal: OAuth2User?
    ): ResponseEntity<BuildDto> {
        val build = repo.findByIdOrNull(id.toInt())
        return build?.let { ResponseEntity.ok(mapper.toDto(it, true, getNameFromPrincipal(principal)))  } ?: ResponseEntity.notFound()
            .build();
    }

    @PostMapping()
    fun createBuilds(
        @RequestBody buildDto: BuildDto,
        @AuthenticationPrincipal principal: OAuth2User
    ): ResponseEntity<BuildDto> {
        validatorFactory.createValidator(buildDto)?.validate()

        val userName = getNameFromPrincipal(principal)!!
        val build = mapper.fromDto(buildDto, userName)
        build.upvotes = 1
        val savedBuild = repo.save(build)
        voteRepo.save(BuildVotes(build = savedBuild, userName = userName, voteType = VoteType.UPVOTE))
        return ResponseEntity.ok(mapper.toDto(savedBuild, false, userName))
    }

    private fun validateSort(sortBy: String?): String {
        val acceptedSort = listOf("upvotes", "timestampCreation");
        return sortBy?.let { if (acceptedSort.contains(it)) it else null } ?: acceptedSort[0]
    }
}