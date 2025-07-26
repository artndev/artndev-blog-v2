package com.blog.blog.records;

import java.sql.Timestamp;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

public record Article(
    @Null Integer id,
    @NotBlank(message = "Title cannot be empty") @Size(max = 255, message = "Title cannot be longer than 255 symbols") String title,
    @NotBlank(message = "Subtitle cannot be empty") @Size(max = 255, message = "Subtitle cannot be longer than 255 symbols") String subtitle,
    @NotBlank(message = "Content cannot be empty") String content,
    @Null Timestamp updated,
    List<String> tags
) {
    public void addTag(String tag) {
        if (tag == null || tags.contains(tag))
            return;

        tags.add(tag);
    }
}