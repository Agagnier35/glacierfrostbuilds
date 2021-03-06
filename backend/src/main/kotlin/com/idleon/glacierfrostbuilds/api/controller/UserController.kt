package com.idleon.glacierfrostbuilds.api.controller

import com.idleon.glacierfrostbuilds.utils.getNameFromPrincipal
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/v1/user")
class UserController {

    @GetMapping
    fun getLoggedInUsername(@AuthenticationPrincipal principal: OAuth2User?): ResponseEntity<String?> {
        return principal?.let { ResponseEntity.ok(getNameFromPrincipal(it)) }
            ?: ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
    }
}