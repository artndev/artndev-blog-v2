package com.blog.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.enums.SortByEnum;
import com.blog.blog.records.Article;
import com.blog.blog.records.ServerResponse;
import com.blog.blog.services.ArticlesService;

import jakarta.validation.Valid;

// @CrossOrigin(
//     origins = "*", 
//     methods = {
//         RequestMethod.GET, 
//         RequestMethod.POST, 
//         RequestMethod.PUT, 
//         RequestMethod.DELETE
//     }, 
//     maxAge = 3600
// )
@RestController
@RequestMapping("/api/v1/articles")
public class ArticlesController {
    @Autowired
    private ArticlesService articlesService;

    // http://localhost:8080/api/v1/articles?sort_by=asc&tags=kitty&tags=doggy
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ServerResponse<List<Article>>> getAllArticles(
        @RequestParam(value = "sort_by", required = false, defaultValue = "ASC") String sortBy, 
        @RequestParam(value = "tags", required = false) List<String> tags
    ) 
    throws DataAccessException {
        SortByEnum validatedSortBy;

        try {
            validatedSortBy = SortByEnum.valueOf(sortBy.toUpperCase());    
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ServerResponse<>("Invalid sort_by parameter has been received", null));
        }
        
        final List<Article> articles = articlesService.getAllArticles(validatedSortBy, tags);

        return ResponseEntity.ok(
            new ServerResponse<List<Article>>("Articles have been got successfully", articles)  
        );  
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ServerResponse<Article>> getArticle(@PathVariable String id) 
    throws DataAccessException {
        return articlesService.getArticle(Integer.parseInt(id))
            .map(article -> ResponseEntity.ok(new ServerResponse<Article>("Article has been got successfully", article)))
            .orElseGet(() -> 
                ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new ServerResponse<>("Article has not been found", null))
            );
    }

    @PostMapping
    public ResponseEntity<ServerResponse<Boolean>> addArticle(@Valid @RequestBody Article article) 
    throws DataAccessException {
        articlesService.addArticle(article);

        return ResponseEntity.ok(
            new ServerResponse<Boolean>("Article has been created successfully", true)  
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServerResponse<Boolean>> updateArticle(@PathVariable String id, @Valid @RequestBody Article article) 
    throws DataAccessException {
        articlesService.updateArticle(Integer.parseInt(id), article);

        return ResponseEntity.ok(
            new ServerResponse<Boolean>("Article has been updated successfully", true)  
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServerResponse<Boolean>> deleteArticle(@PathVariable String id) 
    throws DataAccessException {
        articlesService.deleteArticle(Integer.parseInt(id));

        return ResponseEntity.ok(
            new ServerResponse<Boolean>("Article has been deleted successfully", true)  
        );
    }
}
