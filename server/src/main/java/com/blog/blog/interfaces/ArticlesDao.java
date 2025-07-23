package com.blog.blog.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataAccessException;

import com.blog.blog.enums.SortByEnum;
import com.blog.blog.instances.ArticleTags;

public interface ArticlesDao {
    public List<ArticleTags> getAllArticles(SortByEnum validatedSortBy, List<String> tags) throws DataAccessException;

    public Optional<ArticleTags> getArticle(Integer id) throws DataAccessException;

    public void addArticle(ArticleTags article) throws DataAccessException;

    public void updateArticle(Integer id, ArticleTags newArticle) throws DataAccessException;

    public void deleteArticle(Integer id) throws DataAccessException;
}
