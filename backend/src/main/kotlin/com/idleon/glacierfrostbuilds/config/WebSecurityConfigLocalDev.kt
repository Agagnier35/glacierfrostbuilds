package com.idleon.glacierfrostbuilds.config

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter


@Configuration
@EnableWebSecurity
@Order(1)
@Profile("disable-security")
class WebSecurityConfigLocalDev : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        // This is for local development only, if i see someone use this in prod ill snap your neck
        http.csrf().disable()
            .authorizeRequests { a ->
                a
                    .anyRequest().permitAll()
            }
    }
}