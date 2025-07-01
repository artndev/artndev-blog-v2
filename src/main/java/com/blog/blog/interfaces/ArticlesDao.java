package com.blog.blog.interfaces;

import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;

import com.blog.blog.config.Article;

public interface ArticlesDao {
    public List<Article> getAllArticles() throws DataAccessException;

    public Article getArticle(int id) throws DataAccessException;

    public void addArticle(Article article);

    public void updateArticle(int id, Article newArticle);

    public void deleteArticle(int id);
}
