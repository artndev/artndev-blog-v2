package com.blog.blog.controllers;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.blog.blog.config.ArticlesResponse;

@ControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ArticlesResponse<Object>> handleNotFound(NoHandlerFoundException e) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ArticlesResponse<>(e.getMessage(), null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ArticlesResponse<Object>> handleValidation(MethodArgumentNotValidException e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(new ArticlesResponse<>(e.getMessage(), null));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ArticlesResponse<Object>> handleTypeMismatch(MethodArgumentTypeMismatchException e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(new ArticlesResponse<>(e.getMessage(), null));
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ArticlesResponse<Object>> databaseError(DataAccessException e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(new ArticlesResponse<>(e.getMessage(), null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ArticlesResponse<Object>> internalServerError(Exception e) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ArticlesResponse<>(e.getMessage(), null));
    }
}
