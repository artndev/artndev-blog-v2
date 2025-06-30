package com.blog.blog.services;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.blog.blog.Article;
import com.blog.blog.interfaces.ArticlesDao;
import com.zaxxer.hikari.HikariDataSource;

@Repository
public class ArticlesServiceAccess implements ArticlesDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Article> getAllArticles() throws SQLException {
        return jdbcTemplate.query(
            "SELECT * FROM Articles",
            (rs, rowNum) -> new Article(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("subtitle"),
                rs.getString("content")
            )
        );
    }

    @Override
    public Article getArticle(int id) {
        return new Article(1, "Test", "Test", "Test");
    };

    @Override
    public void addArticle(Article article) {};

    @Override
    public void updateArticle(int id, Article newArticle) {};

    @Override
    public void deleteArticle(int id) {};
}
