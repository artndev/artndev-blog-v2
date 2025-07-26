package com.blog.blog.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.blog.blog.records.Tag;
import com.blog.blog.repositories.TagsRepository;

@ExtendWith(MockitoExtension.class)
class TagsServiceTests {
    @Mock
    private TagsRepository tagsRepository;

    @InjectMocks
    private TagsService tagsService;

    @Test
    void getAllTags() {
        // Given
        final Tag tag = new Tag(null, "TESTA");
        
        final List<Tag> tags = Arrays.asList(tag);
        
        when(tagsRepository.getAllTags()).thenReturn(tags);

        // When
        final List<Tag> result = tagsService.getAllTags();

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).id()).isNull();
        assertThat(result.get(0).tagName()).isEqualTo("TESTA");
        
        verify(tagsRepository).getAllTags();
    }
}
