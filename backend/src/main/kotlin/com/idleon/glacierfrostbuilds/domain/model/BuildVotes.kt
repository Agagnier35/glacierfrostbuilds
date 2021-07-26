package com.idleon.glacierfrostbuilds.domain.model

import javax.persistence.*

@Entity
data class BuildVotes(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Vote_Id")
    var voteId: Int? = 0,

    @ManyToOne
    @JoinColumn(name = "Build_Id")
    var build: Build = Build(),

    @Column(name = "User_name")
    var userName: String = "",

    @Column(name = "Vote_Type")
    @Enumerated
    var voteType: VoteType = VoteType.UPVOTE,
)

enum class VoteType {
    UPVOTE, DOWNVOTE
}
