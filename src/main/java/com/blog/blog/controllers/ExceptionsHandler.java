package com.blog.blog.controllers;

import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> sqlException() {
        return new ResponseEntity<>("{\"message\": \"Server is not responding\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
