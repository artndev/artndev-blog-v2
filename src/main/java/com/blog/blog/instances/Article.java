package com.blog.blog.instances;

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
    private String updated;

    public Article(Integer id, String title, String subtitle, String content, String updated) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.updated = updated;
    }

    public Integer getId() {
        return id;
    }

    public String getUpdated() {
        return updated;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getContent() {
        return content;
    }
}
