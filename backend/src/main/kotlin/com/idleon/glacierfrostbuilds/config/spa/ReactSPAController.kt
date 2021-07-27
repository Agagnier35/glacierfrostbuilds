package com.idleon.glacierfrostbuilds.config.spa

import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamResource
import org.springframework.core.io.Resource
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import javax.servlet.http.HttpServletRequest

@Controller
class ReactSPAController {
    @Value("\${:classpath:META-INF/resources/index.html}")
    private lateinit var index: Resource;

    // disgusting regex that catches everything that doesn't start with "api", and is not a file
    @RequestMapping(value = ["/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}"])
    fun spaPage(req: HttpServletRequest, model: Map<String, Any>): ResponseEntity<InputStreamResource> {
        return ResponseEntity.ok(InputStreamResource(index.inputStream));
    }
}