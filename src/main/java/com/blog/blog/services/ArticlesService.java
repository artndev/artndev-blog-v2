package com.blog.blog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog.Article;
import com.blog.blog.interfaces.ArticlesDao;

@Service
public class ArticlesService {
    @Autowired
    private ArticlesDao articelsDao;

    public List<Article> getAllArticles() {
        return articelsDao.getAllArticles();
    }

    public Article getArticle(int id) {
        return articelsDao.getArticle(id);
    }

    public void addArticle(Article article) {
        articelsDao.addArticle(article);
    }

    public void updateArticle(int id, Article newArticle) {
        articelsDao.updateArticle(id, newArticle);
    }

    public void deleteArticle(int id) {
        articelsDao.deleteArticle(id);
    }
}
