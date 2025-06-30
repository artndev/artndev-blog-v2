package com.blog.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.Article;
import com.blog.blog.services.ArticlesService;

@RestController
public class ArticlesController {
    @Autowired
    private ArticlesService articlesService;

    @GetMapping("/articles")
    public List<Article> getAllArticles() {
        return articlesService.getAllArticles();
    }

    @GetMapping("/articles/{id}")
    public Article getArticle(@PathVariable String id) {
        return articlesService.getArticle(Integer.parseInt(id));
    }

    @PostMapping("/articles")
    public ResponseEntity<String> addArticle(@RequestBody Article article) {
        articlesService.addArticle(article);
        
        return ResponseEntity.ok().body("{\"message\": \"Article has been added successfully\"}");
    }

    @PutMapping("/articles/{id}")
    public ResponseEntity<String> updateArticle(@PathVariable String id, @RequestBody Article article) {
        articlesService.updateArticle(Integer.parseInt(id), article);
        
        return ResponseEntity.ok("{\"message\": \"Article has been updated successfully\"}");
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable String id) {
        articlesService.deleteArticle(Integer.parseInt(id));
        
        return ResponseEntity.ok("{\"message\": \"Article has been deleted successfully\"}");
    }
}
