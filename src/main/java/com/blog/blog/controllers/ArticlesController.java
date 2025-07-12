package com.blog.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.Article;
import com.blog.blog.ArticlesResponse;
import com.blog.blog.services.ArticlesService;

import jakarta.validation.Valid;

@CrossOrigin(
    origins = "http://localhost:5173", 
    methods = {
        RequestMethod.GET, 
        RequestMethod.POST, 
        RequestMethod.PUT, 
        RequestMethod.DELETE
    }, 
    maxAge = 3600
)
@RestController
@RequestMapping("/api")
public class ArticlesController {
    @Autowired
    private ArticlesService articlesService;

    @GetMapping(value = "/articles", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArticlesResponse<List<Article>>> getAllArticles() 
    throws DataAccessException {
        List<Article> articles = articlesService.getAllArticles();

        return ResponseEntity.ok(
            new ArticlesResponse<List<Article>>("Articles have been got successfully", articles)  
        );  
    }

    @GetMapping(value = "/articles/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArticlesResponse<Article>> getArticle(@PathVariable String id) 
    throws DataAccessException {
        Article article = articlesService.getArticle(Integer.parseInt(id));

        return ResponseEntity.ok(
            new ArticlesResponse<Article>("Article has been got successfully", article)  
        );
    }

    @PostMapping("/articles")
    public ResponseEntity<ArticlesResponse<Boolean>> addArticle(@Valid @RequestBody Article article) 
    throws DataAccessException {
        articlesService.addArticle(article);

        return ResponseEntity.ok(
            new ArticlesResponse<Boolean>("Article has been created successfully", true)  
        );
    }

    @PutMapping("/articles/{id}")
    public ResponseEntity<ArticlesResponse<Boolean>> updateArticle(@PathVariable String id, @Valid @RequestBody Article article) 
    throws DataAccessException {
        articlesService.updateArticle(Integer.parseInt(id), article);

        return ResponseEntity.ok(
            new ArticlesResponse<Boolean>("Article has been updated successfully", true)  
        );
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<ArticlesResponse<Boolean>> deleteArticle(@PathVariable String id) 
    throws DataAccessException {
        articlesService.deleteArticle(Integer.parseInt(id));

        return ResponseEntity.ok(
            new ArticlesResponse<Boolean>("Article has been deleted successfully", true)  
        );
    }
}
