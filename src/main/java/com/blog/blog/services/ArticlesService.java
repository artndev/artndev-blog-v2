package com.blog.blog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.blog.blog.instances.Article;
import com.blog.blog.instances.ArticleTags;
import com.blog.blog.interfaces.ArticlesDao;

@Service
public class ArticlesService {
    @Autowired
    private ArticlesDao articelsDao;

    public List<Article> getAllArticles(String sortBy, List<String> tags) throws DataAccessException {
        return articelsDao.getAllArticles(sortBy, tags);
    }

    public Article getArticle(int id) throws DataAccessException {
        return articelsDao.getArticle(id);
    }

    public void addArticle(ArticleTags article) throws DataAccessException {
        articelsDao.addArticle(article);
    }

    public void updateArticle(int id, ArticleTags newArticle) throws DataAccessException {
        articelsDao.updateArticle(id, newArticle);
    }

    public void deleteArticle(int id) throws DataAccessException {
        articelsDao.deleteArticle(id);
    }
}
