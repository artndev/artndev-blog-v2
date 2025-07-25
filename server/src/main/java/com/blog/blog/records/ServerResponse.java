package com.blog.blog.records;

public record ServerResponse<T>(
    String answer,
    T message
) {}
