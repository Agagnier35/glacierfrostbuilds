package com.idleon.glacierfrostbuilds.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView

@Controller
class ReactSPAController {
    // disgusting regex that catches everything that doesn't start with "api"
    @RequestMapping(value = ["/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}"])
    fun spaPage(model: Map<String, Any>): ModelAndView {
        return ModelAndView("index.html", model);
    }
}