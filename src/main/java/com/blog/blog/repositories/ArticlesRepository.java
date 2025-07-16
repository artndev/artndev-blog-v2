package com.blog.blog.repositories;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.blog.blog.instances.ArticleTags;
import com.blog.blog.interfaces.ArticlesDao;
import com.blog.blog.services.row_mappers.ArticleTagsExtractor;

@Repository
public class ArticlesRepository implements ArticlesDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void deleteArticle(Integer id) throws DataAccessException {
        jdbcTemplate.update(
            """
                DELETE FROM Articles WHERE Id = ?;
            """,
            id
        );
    }

    // === GET ===

    @Override
    public List<ArticleTags> getAllArticles(String sortBy, List<String> tags) throws DataAccessException {
        if (tags == null || tags.isEmpty())
        {
            return jdbcTemplate.query(
                String.format("""
                    SELECT 
                        article.Id AS article_id,
                        article.Title,
                        article.Subtitle,
                        article.Content,
                        article.Updated,
                        tag.TagName
                    FROM Articles article
                    LEFT JOIN ArticleTags articleTag ON article.Id = articleTag.ArticleId
                    LEFT JOIN Tags tag ON articleTag.TagId = tag.Id
                    ORDER BY article.Updated %s
                """, sortBy),
                new ArticleTagsExtractor()
            );
        }

        final String placeholder = tags.stream()
            .map(tag -> "?")
            .collect(Collectors.joining(","));
        return jdbcTemplate.query(
            String.format("""
                SELECT 
                    article.Id AS article_id,
                    article.Title,
                    article.Subtitle,
                    article.Content,
                    article.Updated,
                    tag.TagName
                FROM Articles article
                JOIN ArticleTags articleTag ON article.Id = articleTag.ArticleId
                JOIN Tags tag ON articleTag.TagId = tag.Id
                WHERE article.Id IN (
                    SELECT DISTINCT articleTag2.ArticleId
                    FROM ArticleTags articleTag2
                    JOIN Tags tag2 ON articleTag2.TagId = tag2.Id
                    WHERE tag2.TagName IN (%s)
                )
                ORDER BY article.Updated %s;
            """, placeholder, sortBy),
            new ArticleTagsExtractor(),
            tags.toArray()
        );
    }

    @Override
    public Optional<ArticleTags> getArticle(Integer id) throws DataAccessException {
        final List<ArticleTags> articles = jdbcTemplate.query(
            """
                SELECT 
                    article.Id AS article_id,
                    article.Title,
                    article.Subtitle,
                    article.Content,
                    article.Updated,
                    tag.TagName
                FROM Articles article
                LEFT JOIN ArticleTags articleTag ON article.Id = articleTag.ArticleId
                LEFT JOIN Tags tag ON articleTag.TagId = tag.Id
                WHERE article.Id = ?;
            """,
            new ArticleTagsExtractor(),
            id
        );

        return articles
            .stream()
            .findFirst();
    };

    // === EDIT ===

    @Override
    @Transactional
    public void addArticle(ArticleTags article) throws DataAccessException {
        final SimpleJdbcInsert insertIntoArticles = new SimpleJdbcInsert(jdbcTemplate)
            .withTableName("Articles")
            .usingGeneratedKeyColumns("Id")
            .usingColumns("Title", "Subtitle", "Content");

        final Map<String, Object> articleArgs = new HashMap<>();
        articleArgs.put("title", article.getTitle());
        articleArgs.put("subtitle", article.getSubtitle());
        articleArgs.put("content", article.getContent());

        final Number articleId = insertIntoArticles.executeAndReturnKey(articleArgs);

        final List<String> tags = article.getTags();
        if (tags == null || tags.isEmpty())
            return;

        insertTags(tags);
        insertArticleTags(articleId.intValue(), tags);
    };

    @Override
    @Transactional
    public void updateArticle(Integer id, ArticleTags newArticle) throws DataAccessException {
        jdbcTemplate.update(
            """
                UPDATE Articles SET 
                    Title = ?, 
                    Subtitle = ?, 
                    Content = ?
                WHERE Id = ?;
            """,
            newArticle.getTitle(),
            newArticle.getSubtitle(),
            newArticle.getContent(),
            id
        );

        final List<String> tags = newArticle.getTags();
        if (tags == null || tags.isEmpty())
            return;

        insertTags(tags);

        jdbcTemplate.update(
            "DELETE FROM ArticleTags WHERE ArticleId = ?",
            id
        );

        insertArticleTags(id, tags);
    }

    // === UTILS ===

    private void insertTags(List<String> tags) {
        final List<Object[]> tagsBatch = tags.stream()
            .map(tag -> new Object[] { tag })
            .collect(Collectors.toList());

        jdbcTemplate.batchUpdate(
            "INSERT IGNORE INTO Tags (TagName) VALUES (?);",
            tagsBatch
        );
    }

    private void insertArticleTags(Integer articleId, List<String> tags) {
        final String placeholder = tags.stream()
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
    }
}
