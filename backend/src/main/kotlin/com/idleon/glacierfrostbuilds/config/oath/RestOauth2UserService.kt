package com.idleon.glacierfrostbuilds.config.oath

import com.idleon.glacierfrostbuilds.utils.Constants.DISCORD_BOT_USER_AGENT
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority
import org.springframework.web.client.RestOperations

class RestOAuth2UserService(private val restOperations: RestOperations) :
    OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    override fun loadUser(userRequest: OAuth2UserRequest): Oauth2UserWithProvider {
        val user: OAuth2User
        if ("discord" == userRequest.clientRegistration?.registrationId) {
            val userInfoUrl = userRequest.clientRegistration.providerDetails.userInfoEndpoint.uri
            val headers = HttpHeaders()
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer ${userRequest.accessToken.tokenValue}")
            headers.set(HttpHeaders.USER_AGENT, DISCORD_BOT_USER_AGENT)

            val responseEntity = restOperations.exchange(
                userInfoUrl,
                HttpMethod.GET,
                HttpEntity<Any>(headers),
                object : ParameterizedTypeReference<Map<String, Any>>() {})

            val userAttributes = responseEntity.body
            val authorities: Set<GrantedAuthority> = setOf(OAuth2UserAuthority(userAttributes))
            user = DefaultOAuth2User(
                authorities,
                userAttributes,
                userRequest.clientRegistration.providerDetails.userInfoEndpoint.userNameAttributeName
            )
        } else {
            user = DefaultOAuth2UserService().loadUser(userRequest)
        }
        return Oauth2UserWithProvider(
            userRequest.clientRegistration.registrationId,
            userRequest.clientRegistration.providerDetails.userInfoEndpoint.userNameAttributeName,
            user
        );
    }
}

data class Oauth2UserWithProvider(val provider: String, val userNameAttribute: String, val user: OAuth2User) :
    DefaultOAuth2User(user.authorities, user.attributes, userNameAttribute)