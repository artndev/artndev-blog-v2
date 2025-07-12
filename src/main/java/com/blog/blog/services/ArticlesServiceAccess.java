package com.blog.blog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.blog.blog.Article;
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
        return jdbcTemplate.queryForObject(
            """
                SELECT * FROM Articles WHERE Id = ?;        
            """,
            new ArticleRowMapper(),
            id
        );
    };

    @Override
    public void addArticle(Article article) throws DataAccessException {
        jdbcTemplate.update(
            """
                INSERT INTO Articles (Title, Subtitle, Content, Tags) VALUES(?, ?, ?, ?);        
            """,
            article.getTitle(),
            article.getSubtitle(),
            article.getContent(),
            article.getTags()
        );
    };

    @Override
    public void updateArticle(int id, Article newArticle) throws DataAccessException {
        jdbcTemplate.update(
            """
                UPDATE Articles SET 
                    Title = ?, 
                    Subtitle = ?, 
                    Content = ?,
                    Tags = ?,
                    Updated = CURRENT_TIMESTAMP()
                WHERE Id = ?;
            """,
            newArticle.getTitle(),
            newArticle.getSubtitle(),
            newArticle.getContent(),
            newArticle.getTags(),
            id
        );
    }

    @Override
    public void deleteArticle(int id) throws DataAccessException {
        jdbcTemplate.update(
            """
                DELETE FROM Articles WHERE Id = ?;
            """,
            id
        );
    }
}
