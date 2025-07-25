package com.blog.blog.exceptions;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.blog.blog.records.ServerResponse;

@ControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ServerResponse<Object>> validationError(MethodArgumentNotValidException e) {
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        final String message = fieldErrors
            .stream()
            .map(FieldError::getDefaultMessage)
            .collect(Collectors.joining("; "));

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ServerResponse<>(message, null));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ServerResponse<Object>> typeMismatchError(MethodArgumentTypeMismatchException e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ServerResponse<>(e.getMessage(), null));
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ServerResponse<Object>> databaseError(DataAccessException e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ServerResponse<>(e.getMessage(), null));
    }
}
