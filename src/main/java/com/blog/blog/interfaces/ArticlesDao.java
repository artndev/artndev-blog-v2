package com.blog.blog.interfaces;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.blog.blog.config.Article;

public interface ArticlesDao {
    public List<Article> getAllArticles() throws DataAccessException;

    public Article getArticle(int id) throws DataAccessException;

    public void addArticle(Article article) throws DataAccessException;

    public void updateArticle(int id, Article newArticle) throws DataAccessException;

    public void deleteArticle(int id) throws DataAccessException;
}
