package com.idleon.glacierfrostbuilds.config.spa

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.HttpServletRequest

@Controller
class ReactSPAController {
    // disgusting regex that catches everything that doesn't start with "api", and is not a file
    @RequestMapping(value = ["/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}"])
    fun spaPage(req:HttpServletRequest, model: Map<String, Any>): ModelAndView {
        return ModelAndView("index.html", model);
    }
}