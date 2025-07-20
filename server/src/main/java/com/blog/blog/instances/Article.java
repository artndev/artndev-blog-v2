package com.blog.blog.instances;

import java.sql.Timestamp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

public class Article {
    @Null
    private Integer id;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title cannot be longer than 255 symbols")
    private String title;

    @NotBlank(message = "Subtitle is required")
    @Size(max = 255, message = "Subtitle cannot be longer than 255 symbols")
    private String subtitle;

    @NotBlank(message = "Content is required")
    private String content;

    @Null
    private Timestamp updated;

    public Article(Integer id, String title, String subtitle, String content, Timestamp updated) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.updated = updated;
    }

    public Integer getId() {
        return this.id;
    }

    public Timestamp getUpdated() {
        return this.updated;
    }

    public String getTitle() {
        return this.title;
    }

    public String getSubtitle() {
        return this.subtitle;
    }

    public String getContent() {
        return this.content;
    }
}
