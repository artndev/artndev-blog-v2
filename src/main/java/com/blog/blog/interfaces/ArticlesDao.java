package com.blog.blog.interfaces;

import java.util.List;

import com.blog.blog.Article;

public interface ArticlesDao {
    public List<Article> getAllArticles();

    public Article getArticle(int id);

    public void addArticle(Article article);

    public void updateArticle(int id, Article newArticle);

    public void deleteArticle(int id);
}
