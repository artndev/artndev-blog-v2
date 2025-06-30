package com.blog.blog.services;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.blog.blog.Article;
import com.blog.blog.interfaces.ArticlesDao;

@Repository
public class ArticlesServiceAccess implements ArticlesDao {
    @Override
    public List<Article> getAllArticles() {
        return List.of(new Article(1, "Test", "Test", "Test"));
    }

    @Override
    public Article getArticle(int id) {
        return new Article(1, "Test", "Test", "Test");
    };

    @Override
    public void addArticle(Article article) {};

    @Override
    public void updateArticle(int id, Article newArticle) {};

    @Override
    public void deleteArticle(int id) {};
}
