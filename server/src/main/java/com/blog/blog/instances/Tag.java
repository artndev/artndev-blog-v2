package com.blog.blog.instances;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

public class Tag {
    @Null
    private Integer id;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name cannot be longer than 100 symbols")
    private String tagName;

    public Tag(Integer id, String tagName) {
        this.id = id;
        this.tagName = tagName;
    }

    public Integer getId() {
        return this.id;
    }

    public String getTagName() {
        return this.tagName;
    }
}
