package com.blog.blog.controllers;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.config.Article;
import com.blog.blog.config.ArticlesResponse;
import com.blog.blog.services.ArticlesService;

@RestController
public class ArticlesController {
    @Autowired
    private ArticlesService articlesService;

    @GetMapping("/articles")
    public ResponseEntity<ArticlesResponse<List<Article>>> getAllArticles() throws DataAccessException {
        try {
            List<Article> articles = articlesService.getAllArticles();

            return ResponseEntity.ok(
                new ArticlesResponse<List<Article>>("Articles have been got successfully", articles)  
            );            
        } catch (DataAccessException e) {
            return ResponseEntity.status(500).body(
                new ArticlesResponse<>("Server is not responding", null)
            );
        }
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticlesResponse<Article>> getArticle(@PathVariable String id) throws DataAccessException {
        try {
            Article article = articlesService.getArticle(Integer.parseInt(id));

            if (article == null)
                return ResponseEntity.status(400).body(
                    new ArticlesResponse<>("Article has not been found", null)
                );

            return ResponseEntity.ok(
              new ArticlesResponse<Article>("Article has been got successfully", article)  
            );
        } catch (DataAccessException e) {
            return ResponseEntity.status(500).body(
                new ArticlesResponse<>("Server is not responding", null)
            );
        }
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
