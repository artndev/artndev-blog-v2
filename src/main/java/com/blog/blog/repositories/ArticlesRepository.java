package com.blog.blog.repositories;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.blog.blog.instances.Article;
import com.blog.blog.instances.ArticleTags;
import com.blog.blog.interfaces.ArticlesDao;
import com.blog.blog.services.row_mappers.ArticleRowMapper;

@Repository
public class ArticlesRepository implements ArticlesDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Article> getAllArticles(String sortBy, List<String> tags) throws DataAccessException {
        if (tags == null || tags.isEmpty())
        {
            return jdbcTemplate.query(
                """
                   SELECT * FROM Articles;
                """,
                new ArticleRowMapper()
            );
        }

        String placeholder = tags.stream()
            .map(tag -> "?")
            .collect(Collectors.joining(","));
        return jdbcTemplate.query(
            """
               SELECT article.*
               FROM Articles article
               JOIN ArticleTags articleTag ON article.Id = articleTag.ArticleId
               JOIN Tags tag ON articleTag.TagId = tag.Id
               WHERE tag.TagName IN (%s)
               ORDER BY article.Updated %s;
            """.formatted(placeholder, sortBy),
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
    public void addArticle(ArticleTags article) throws DataAccessException {
        SimpleJdbcInsert insertIntoArticles = new SimpleJdbcInsert(jdbcTemplate)
            .withTableName("Articles")
            .usingGeneratedKeyColumns("Id");

        final Map<String, Object> articleArgs = new HashMap<>();
        articleArgs.put("title", article.getTitle());
        articleArgs.put("subtitle", article.getSubtitle());
        articleArgs.put("content", article.getContent());
        articleArgs.put("updated", article.getUpdated());

        Number articleId = insertIntoArticles.executeAndReturnKey(articleArgs);
        List<String> tags = article.getTags();
        if (tags == null || tags.isEmpty())
            return;

        List<Object[]> tagsBatch = tags.stream()
            .map(tag -> new Object[] { tag })
            .collect(Collectors.toList());
        jdbcTemplate.batchUpdate(
            """
                INSERT IGNORE INTO Tags (TagName) VALUES (?);      
            """,
            tagsBatch
        );

        String placeholder = tags.stream()
            .map(tag -> "?")
            .collect(Collectors.joining(","));

        List<Object> tagsParams = new ArrayList<>();
        tagsParams.add(articleId);
        tagsParams.addAll(tags);

        jdbcTemplate.update(
            String.format(
            """
                INSERT INTO ArticleTags (ArticleId, TagId)
                SELECT ?, Id FROM Tags WHERE TagName IN (%s);
            """, placeholder),
            tagsParams.toArray()
        );
    };

    @Override
    public void updateArticle(int id, ArticleTags newArticle) throws DataAccessException {
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
