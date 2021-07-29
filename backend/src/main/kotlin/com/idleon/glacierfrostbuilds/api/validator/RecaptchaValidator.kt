package com.idleon.glacierfrostbuilds.api.validator

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper
import com.idleon.glacierfrostbuilds.api.exceptions.RestError
import com.idleon.glacierfrostbuilds.api.exceptions.RestException
import com.idleon.glacierfrostbuilds.api.exceptions.RestIssue
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.io.OutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.time.LocalDateTime


@Component
class RecaptchaValidator {
    @Value("\${RECAPTCHA_SECRET}")
    private lateinit var secret: String;

    fun validateReCaptcha(token: String?): Unit {
        if (token == null) {
            throw RestException(RestError(HttpStatus.FORBIDDEN, listOf(RestIssue("You failed the recaptcha test"))))
        }

        val url = "https://www.google.com/recaptcha/api/siteverify"
        val params = "secret=$secret&response=$token"

        val http: HttpURLConnection = URL(url).openConnection() as HttpURLConnection
        http.doOutput = true
        http.requestMethod = "POST"
        http.setRequestProperty(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        )
        val out: OutputStream = http.outputStream
        out.write(params.toByteArray(charset("UTF-8")))
        out.flush()
        out.close()

        val res: InputStream = http.inputStream
        val rd = BufferedReader(InputStreamReader(res, "UTF-8"))

        val sb = StringBuilder()
        var cp: Int
        while (rd.read().also { cp = it } != -1) {
            sb.append(cp.toChar())
        }
        val json = ObjectMapper().readValue(sb.toString(), RecatchaResponse::class.java)
        res.close()

        if (!json.success) {
            throw RestException(RestError(HttpStatus.FORBIDDEN, listOf(RestIssue("You failed the recaptcha test"))))
        }
    }
}

class RecatchaResponse(
    @JsonProperty("success") var success: Boolean = false,
    @JsonProperty("score") var score: Double = 0.0,
    @JsonProperty("action") var action: String = "",
    @JsonProperty("challenge_ts") var challenge_ts: String = "",
    @JsonProperty("hostname") var hostname: String = "",
    @JsonProperty("error-codes") var errorCodes: List<Any>? = listOf()
)