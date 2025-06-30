package com.blog.blog.interfaces;

import java.sql.SQLException;
import java.util.List;

import com.blog.blog.Article;

public interface ArticlesDao {
    public List<Article> getAllArticles() throws SQLException;

    public Article getArticle(int id);

    public void addArticle(Article article);

    public void updateArticle(int id, Article newArticle);

    public void deleteArticle(int id);
}
