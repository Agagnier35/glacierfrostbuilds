package com.idleon.glacierfrostbuilds.utils

import com.idleon.glacierfrostbuilds.config.oath.Oauth2UserWithProvider
import org.springframework.security.oauth2.core.user.OAuth2User

fun getNameFromPrincipal(principal: OAuth2User?): String? {
    return if (principal is Oauth2UserWithProvider) principal.let {
        when (principal.provider) {
            "discord" -> it.attributes["username"].toString()
            "google" -> it.attributes["name"].toString()
            else -> "Stop it Hackerman!"
        }
    } else "Stop it Hackerman!"
}