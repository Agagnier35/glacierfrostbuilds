package com.idleon.glacierfrostbuilds.config

import com.idleon.glacierfrostbuilds.config.oath.RestOAuth2AccessTokenResponseClient
import com.idleon.glacierfrostbuilds.config.oath.RestOAuth2UserService
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.authentication.HttpStatusEntryPoint
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler
import org.springframework.web.client.RestTemplate


@Configuration
@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http
            .cors().and().csrf().disable()
            .authorizeRequests { a ->
                a
                    .antMatchers(HttpMethod.POST, "/api/**").authenticated()
                    .antMatchers(HttpMethod.PUT, "/api/**").authenticated()
                    .antMatchers(HttpMethod.PATCH, "/api/**").authenticated()
                    .antMatchers(HttpMethod.DELETE, "/api/**").authenticated()
                    .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                    .anyRequest().permitAll()
            }
            .exceptionHandling { e ->
                e.authenticationEntryPoint(HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            }
            .logout().logoutUrl("/api/v1/logout")
            .logoutSuccessHandler(HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
            .and()

            .oauth2Login()
            // Frontend Auth request
            .authorizationEndpoint { r ->
                r.baseUri("/oauth2/authorization")
            }
            // Auth Provider callback
            .redirectionEndpoint { r ->
                r.baseUri("/api/v1/login/oauth2/code/*")
            }
            // Convert Auth into Token (Custom impl for discord)
            .tokenEndpoint().accessTokenResponseClient(RestOAuth2AccessTokenResponseClient(RestTemplate()))
            .and()
            .userInfoEndpoint().userService(RestOAuth2UserService(RestTemplate()))
            .and()
            // Redirects for after Auth
            .successHandler { request, response, _ ->
                response.sendRedirect(if (request.serverName == "localhost") "http://localhost:3000" else "/")
            }
            .failureHandler { request, response, _ ->
                response.sendRedirect(if (request.serverName == "localhost") "http://localhost:3000/error" else "/error")
            }


    }
}