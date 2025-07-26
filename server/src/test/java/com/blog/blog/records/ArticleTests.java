package com.blog.blog.records;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ArticleTests {
    @Test
    void addTag() {
        // Given
        Article article = new Article(
            null, 
            "Test Title", 
            "Test Subtitle", 
            "Test Content", 
            null,
            new ArrayList<>()
        );

        // When
        article.addTag("TESTA");

        assertThat(article.tags()).containsExactly("TESTA");
    }

    @Test
    void addTag_duplicate() {
        // Given
        Article article = new Article(
            null, 
            "Test Title", 
            "Test Subtitle", 
            "Test Content", 
            null,
            Arrays.asList("TESTA")
        );

        // When
        article.addTag("TESTA");

        assertThat(article.tags()).hasSize(1);
        assertThat(article.tags()).containsExactly("TESTA");
    }

    @Test
    void addTag_null() {
        // Given
        Article article = new Article(
            null, 
            "Test Title", 
            "Test Subtitle", 
            "Test Content", 
            null,
            Arrays.asList("TESTA")
        );

        // When
        article.addTag(null);

        assertThat(article.tags()).hasSize(1);
        assertThat(article.tags()).containsExactly("TESTA");
    }
}
