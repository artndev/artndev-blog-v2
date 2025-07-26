package com.blog.blog.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.blog.blog.enums.SortByEnum;
import com.blog.blog.records.Article;
import com.blog.blog.repositories.ArticlesRepository;

@ExtendWith(MockitoExtension.class)
class ArticlesServiceTests {
    @Mock
    private ArticlesRepository articlesRepository;

    @InjectMocks
    private ArticlesService articlesService;

    @Test
    void getAllArticles() {
        // Given
        final Timestamp updated = Timestamp.from(Instant.now());

        final SortByEnum sortBy = SortByEnum.ASC;

        final List<Article> articles = Arrays.asList(
            new Article(
                1, 
                "Test Title", 
                "Test Subtitle", 
                "Test Content", 
                updated,
                Arrays.asList("TESTA", "TESTB")
            )
        );
        
        when(articlesRepository.getAllArticles(sortBy, null)).thenReturn(articles);

        // When
        final List<Article> result = articlesService.getAllArticles(sortBy, null);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).id()).isEqualTo(1);
        assertThat(result.get(0).title()).isEqualTo("Test Title");
        assertThat(result.get(0).subtitle()).isEqualTo("Test Subtitle");
        assertThat(result.get(0).content()).isEqualTo("Test Content");
        assertThat(result.get(0).updated()).isEqualTo(updated);
        assertThat(result.get(0).tags()).containsExactlyInAnyOrder("TESTA", "TESTB");
        
        verify(articlesRepository).getAllArticles(sortBy, null);
    }

    @Test
    void getAllArticles_asc() {
        // Given
        final Instant now = Instant.now();
        final Timestamp updated = Timestamp.from(now);
        final Timestamp updated2 = Timestamp.from(now.plus(Duration.ofDays(1)));

        final SortByEnum sortBy = SortByEnum.ASC;

        final List<Article> articles = Arrays.asList(
            new Article(
                1, 
                "Test Title", 
                "Test Subtitle", 
                "Test Content", 
                updated2,
                Arrays.asList("TESTA")
            ),
            new Article(
                2, 
                "Test Title 2", 
                "Test Subtitle 2", 
                "Test Content 2", 
                updated,
                Arrays.asList("TESTA", "TESTB")
            )
        );
        
        when(articlesRepository.getAllArticles(sortBy, null)).thenReturn(
            Arrays.asList(articles.get(1), articles.get(0))
        );

        // When
        List<Article> result = articlesService.getAllArticles(sortBy, null);

        // Then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).id()).isEqualTo(2);
        assertThat(result.get(1).id()).isEqualTo(1);
        
        verify(articlesRepository).getAllArticles(sortBy, null);
    }

    @Test
    void getAllArticles_desc() {
        // Given
        final Instant now = Instant.now();
        final Timestamp updated = Timestamp.from(now);
        final Timestamp updated2 = Timestamp.from(now.plus(Duration.ofDays(1)));

        final SortByEnum sortBy = SortByEnum.DESC;

        final List<Article> articles = Arrays.asList(
            new Article(
                1, 
                "Test Title", 
                "Test Subtitle", 
                "Test Content", 
                updated,
                Arrays.asList("TESTA")
            ),
            new Article(
                2, 
                "Test Title 2", 
                "Test Subtitle 2", 
                "Test Content 2", 
                updated2,
                Arrays.asList("TESTA", "TESTB")
            )
        );
        
        when(articlesRepository.getAllArticles(sortBy, null)).thenReturn(
            Arrays.asList(articles.get(1), articles.get(0))
        );

        // When
        List<Article> result = articlesService.getAllArticles(sortBy, null);

        // Then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).id()).isEqualTo(2);
        assertThat(result.get(1).id()).isEqualTo(1);
        
        verify(articlesRepository).getAllArticles(sortBy, null);
    }

    @Test
    void getAllArticles_tags() {
        // Given
        final Instant now = Instant.now();
        final Timestamp updated = Timestamp.from(now);
        final Timestamp updated2 = Timestamp.from(now.plus(Duration.ofDays(1)));

        final SortByEnum sortBy = SortByEnum.DESC;
        final List<String> tags = Arrays.asList("TESTB");

        final List<Article> articles = Arrays.asList(
            new Article(
                1, 
                "Test Title", 
                "Test Subtitle", 
                "Test Content", 
                updated,
                Arrays.asList("TESTA")
            ),
            new Article(
                2, 
                "Test Title 2", 
                "Test Subtitle 2", 
                "Test Content 2", 
                updated2,
                Arrays.asList("TESTA", "TESTB")
            )
        );
        
        when(articlesRepository.getAllArticles(sortBy, tags)).thenReturn(
            Arrays.asList(articles.get(1))
        );

        // When
        List<Article> result = articlesService.getAllArticles(sortBy, tags);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).id()).isEqualTo(2);
        
        verify(articlesRepository).getAllArticles(sortBy, tags);
    }


    @Test
    void getArticle() {
        // Given
        final Timestamp updated = Timestamp.from(Instant.now());
        final Article article = new Article(
            1, 
            "Test Title", 
            "Test Subtitle", 
            "Test Content", 
            updated,
            Arrays.asList("TESTA", "TESTB")
        );
        
        when(articlesRepository.getArticle(1)).thenReturn(Optional.of(article));

        // When
        final Optional<Article> result = articlesService.getArticle(1);

        // Then
        assertThat(result).isPresent();
        assertThat(result.get().id()).isEqualTo(1);
        assertThat(result.get().title()).isEqualTo("Test Title");
        assertThat(result.get().subtitle()).isEqualTo("Test Subtitle");
        assertThat(result.get().content()).isEqualTo("Test Content");
        assertThat(result.get().updated()).isEqualTo(updated);
        assertThat(result.get().tags()).containsExactlyInAnyOrder("TESTA", "TESTB");
        
        verify(articlesRepository).getArticle(1);
    }

    @Test
    void getArticle_null() {
        // Given
        when(articlesRepository.getArticle(999)).thenReturn(Optional.empty());

        // When
        final Optional<Article> result = articlesService.getArticle(999);

        // Then
        assertThat(result).isEmpty();
        
        verify(articlesRepository).getArticle(999);
    }


    @Test
    void addArticle() {
        // Given
        final Article article = new Article(
            null, 
            "Test Title", 
            "Test Subtitle", 
            "Test Content", 
            null,
            Arrays.asList("TESTA", "TESTB")
        );
        
        doNothing().when(articlesRepository).addArticle(article);

        // When & Then
        assertThatNoException().isThrownBy(() -> articlesService.addArticle(article));

        verify(articlesRepository).addArticle(article);
    }

    @Test
    void updateArticle() {
        // Given
        final Timestamp updated = Timestamp.from(Instant.now());
        final Article article = new Article(
            1, 
            "Test Title", 
            "Test Subtitle", 
            "Test Content", 
            updated,
            Arrays.asList("TESTA", "TESTB")
        );
        
        doNothing().when(articlesRepository).updateArticle(1, article);

        // When & Then
        assertThatNoException().isThrownBy(() -> articlesService.updateArticle(1, article));

        verify(articlesRepository).updateArticle(1, article);
    }

    @Test
    void deleteArticle() {
        // Given
        doNothing().when(articlesRepository).deleteArticle(1);

        // When & Then
        assertThatNoException().isThrownBy(() -> articlesService.deleteArticle(1));

        verify(articlesRepository).deleteArticle(1);
    }
}