package com.blog.blog.interfaces;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.blog.blog.instances.Article;
import com.blog.blog.instances.ArticleTags;

public interface ArticlesDao {
    public List<Article> getAllArticles(String sortBy, List<String> tags) throws DataAccessException;

    public Article getArticle(int id) throws DataAccessException;

    public void addArticle(ArticleTags article) throws DataAccessException;

    public void updateArticle(int id, ArticleTags newArticle) throws DataAccessException;

    public void deleteArticle(int id) throws DataAccessException;
}
