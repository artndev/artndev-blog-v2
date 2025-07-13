package com.blog.blog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;

public class Article {
    @Null
    private Integer id;

    @Null
    private String updated;

    @NotBlank(message = "Title is required")
    // @Size(max = 255, message = "Title cannot be longer than 255 symbols")
    private String title;

    @NotBlank(message = "Subtitle is required")
    // @Size(max = 255, message = "Subtitle cannot be longer than 255 symbols")
    private String subtitle;

    @NotBlank(message = "Content is required")
    private String content;

    @NotBlank(message = "Tags are required")
    private String tags;

    public Article(Integer id, String title, String subtitle, String content, String updated, String tags) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.updated = updated;
        this.tags = tags;
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

    public String getTags() {
        return tags;
    }
}
