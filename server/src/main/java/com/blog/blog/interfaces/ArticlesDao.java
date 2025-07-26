package com.blog.blog.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataAccessException;

import com.blog.blog.enums.SortByEnum;
import com.blog.blog.records.Article;

public interface ArticlesDao {
    public List<Article> getAllArticles(SortByEnum validatedSortBy, List<String> tags) throws DataAccessException;

    public Optional<Article> getArticle(Integer id) throws DataAccessException;

    public void addArticle(Article article) throws DataAccessException;

    public void updateArticle(Integer id, Article newArticle) throws DataAccessException;

    public void deleteArticle(Integer id) throws DataAccessException;
}
