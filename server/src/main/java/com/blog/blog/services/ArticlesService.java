package com.blog.blog.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.blog.blog.enums.SortByEnum;
import com.blog.blog.interfaces.ArticlesDao;
import com.blog.blog.records.Article;

@Service
public class ArticlesService {
    @Autowired
    private ArticlesDao articelsDao;

    public List<Article> getAllArticles(SortByEnum validatedSortBy, List<String> tags) throws DataAccessException {
        return articelsDao.getAllArticles(validatedSortBy, tags);
    }

    public Optional<Article> getArticle(Integer id) throws DataAccessException {
        return articelsDao.getArticle(id);
    }

    public void addArticle(Article article) throws DataAccessException {
        articelsDao.addArticle(article);
    }

    public void updateArticle(Integer id, Article newArticle) throws DataAccessException {
        articelsDao.updateArticle(id, newArticle);
    }

    public void deleteArticle(Integer id) throws DataAccessException {
        articelsDao.deleteArticle(id);
    }
}
