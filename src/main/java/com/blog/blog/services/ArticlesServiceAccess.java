package com.blog.blog.services;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.blog.blog.config.Article;
import com.blog.blog.config.ArticleRowMapper;
import com.blog.blog.interfaces.ArticlesDao;

@Repository
public class ArticlesServiceAccess implements ArticlesDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Article> getAllArticles() throws DataAccessException {
        return jdbcTemplate.query(
            """
               SELECT * FROM Articles;     
            """,
            new ArticleRowMapper()
        );
    }

    @Override
    public Article getArticle(int id) throws DataAccessException {
        try {
            return jdbcTemplate.queryForObject(
                """
                    SELECT * FROM Articles WHERE Id = ?;        
                """,
                new ArticleRowMapper(),
                id
            );
        } catch (DataAccessException e) {
            return null;
        }
    };

    @Override
    public void addArticle(Article article) {};

    @Override
    public void updateArticle(int id, Article newArticle) {};

    @Override
    public void deleteArticle(int id) {};
}
