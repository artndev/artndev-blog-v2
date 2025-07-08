package com.blog.blog.controllers;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorHandler implements ErrorController {
    @RequestMapping("/error")
    public String index() {
        return "forward:/index.html";
    }
}