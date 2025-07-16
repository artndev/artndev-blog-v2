package com.blog.blog.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.blog.blog.instances.ArticleTags;
import com.blog.blog.interfaces.ArticlesDao;

@Service
public class ArticlesService {
    @Autowired
    private ArticlesDao articelsDao;

    public List<ArticleTags> getAllArticles(String sortBy, List<String> tags) throws DataAccessException {
        return articelsDao.getAllArticles(sortBy, tags);
    }

    public Optional<ArticleTags> getArticle(Integer id) throws DataAccessException {
        return articelsDao.getArticle(id);
    }

    public void addArticle(ArticleTags article) throws DataAccessException {
        articelsDao.addArticle(article);
    }

    public void updateArticle(Integer id, ArticleTags newArticle) throws DataAccessException {
        articelsDao.updateArticle(id, newArticle);
    }

    public void deleteArticle(Integer id) throws DataAccessException {
        articelsDao.deleteArticle(id);
    }
}
