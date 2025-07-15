package com.blog.blog.instances;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

public class Tag {
    @Null
    private Integer id;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name cannot be longer than 100 symbols")
    private String name;

    public Tag(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }
}
