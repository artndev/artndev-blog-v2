package com.blog.blog.records;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

public record Tag(
    @Null Integer id,
    @NotBlank(message = "Name is required") @Size(max = 100, message = "Name cannot be longer than 100 symbols") String tagName
) {}