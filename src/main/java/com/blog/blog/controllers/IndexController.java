package com.blog.blog.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class IndexController {
    @RequestMapping({"/", "/articles", "/articles/**", "/admin-panel", "/admin-panel/**", "/error", "/error/**"})
    public String index() {
        return "forward:/index.html";
    }
}