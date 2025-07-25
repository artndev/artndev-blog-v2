package com.blog.blog.records;

public record ServerResponse<T>(
    String message,
    T answer
) {}
