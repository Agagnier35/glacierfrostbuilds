package com.idleon.glacierfrostbuilds.config.oath

import com.fasterxml.jackson.annotation.JsonProperty
import com.idleon.glacierfrostbuilds.utils.Constants.DISCORD_BOT_USER_AGENT
import org.springframework.http.*
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest
import org.springframework.security.oauth2.core.OAuth2AccessToken
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.client.RestOperations

class RestOAuth2AccessTokenResponseClient(private val restOperations: RestOperations) :
    OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest?> {

    override fun getTokenResponse(authorizationGrantRequest: OAuth2AuthorizationCodeGrantRequest?): OAuth2AccessTokenResponse {
        val clientRegistration = authorizationGrantRequest?.clientRegistration
        val tokenUri = clientRegistration?.providerDetails?.tokenUri

        if ("discord" != clientRegistration?.registrationId) {
            return DefaultAuthorizationCodeTokenResponseClient().getTokenResponse(authorizationGrantRequest)
        }

        val tokenRequest = LinkedMultiValueMap<String, String>()
        tokenRequest.add("client_id", clientRegistration.clientId)
        tokenRequest.add("client_secret", clientRegistration.clientSecret)
        tokenRequest.add("grant_type", clientRegistration.authorizationGrantType.value)
        tokenRequest.add(
            "code",
            authorizationGrantRequest.authorizationExchange.authorizationResponse.code
        )
        tokenRequest.add(
            "redirect_uri",
            authorizationGrantRequest.authorizationExchange.authorizationRequest.redirectUri
        )
        tokenRequest.add(
            "scope",
            authorizationGrantRequest.clientRegistration.scopes.joinToString(" ")
        )

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED
        headers.add(HttpHeaders.USER_AGENT, DISCORD_BOT_USER_AGENT)

        val response: ResponseEntity<AccessResponse> = restOperations.exchange(
            tokenUri ?: "", HttpMethod.POST, HttpEntity(tokenRequest, headers),
            AccessResponse::class.java
        )
        val accessResponse = response.body
        val scopes = if (accessResponse?.scopes?.isEmpty() == true)
            authorizationGrantRequest.authorizationExchange.authorizationRequest.scopes
        else accessResponse?.scopes

        return OAuth2AccessTokenResponse.withToken(accessResponse?.accessToken)
            .tokenType(accessResponse?.getTokenType())
            .expiresIn((accessResponse?.expiresIn ?: 0).toLong())
            .scopes(scopes)
            .build()
    }

    internal class AccessResponse {
        @JsonProperty("access_token")
        var accessToken: String? = null

        @JsonProperty("token_type")
        var tokenType: String? = null

        @JsonProperty("expires_in")
        var expiresIn = 0

        @JsonProperty("refresh_token")
        private var refreshToken: String? = null
        private var scope: String? = null

        constructor() {}
        constructor(accessToken: String?, tokenType: String?, expiresIn: Int, refreshToken: String?, scope: String?) {
            this.accessToken = accessToken
            this.tokenType = tokenType
            this.expiresIn = expiresIn
            this.refreshToken = refreshToken
            this.scope = scope
        }

        fun getTokenType(): OAuth2AccessToken.TokenType? {
            return if (OAuth2AccessToken.TokenType.BEARER.value.equals(
                    tokenType,
                    ignoreCase = true
                )
            ) OAuth2AccessToken.TokenType.BEARER else null
        }

        val scopes: Set<String>
            get() = if (scope.isNullOrEmpty()) hashSetOf() else scope!!.split("\\s+").toSet()

    }
}