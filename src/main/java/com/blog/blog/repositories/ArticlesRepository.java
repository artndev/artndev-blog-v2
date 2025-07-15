package com.blog.blog.repositories;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.blog.blog.instances.Article;
import com.blog.blog.interfaces.ArticlesDao;
import com.blog.blog.services.row_mappers.ArticleRowMapper;

@Repository
public class ArticlesRepository implements ArticlesDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Article> getAllArticles(String sortBy, List<String> tags) throws DataAccessException {
        String placeholders = tags.stream()
            .map(tag -> "?")
            .collect(Collectors.joining(","));

        return jdbcTemplate.query(
            """
               SELECT article.*
               FROM Articles article
               JOIN ArticleTags articleTag ON article.Id = articleTag.ArticleId
               JOIN Tags tag ON articleTag.TagId = tag.Id
               WHERE tag.TagName IN (%s)
               GROUP BY article.Id
               ORDER BY article.Updated %s;     
            """.formatted(placeholders, sortBy),
            new ArticleRowMapper(),
            tags.toArray()
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
                INSERT INTO Articles (Title, Subtitle, Content) VALUES(?, ?, ?);        
            """,
            article.getTitle(),
            article.getSubtitle(),
            article.getContent()
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
                WHERE Id = ?;
            """,
            newArticle.getTitle(),
            newArticle.getSubtitle(),
            newArticle.getContent(),
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
