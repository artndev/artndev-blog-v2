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

import com.blog.blog.enums.SortByEnum;
import com.blog.blog.interfaces.ArticlesDao;
import com.blog.blog.records.Article;
import com.blog.blog.services.mappers.ArticleExtractor;

@Repository
public class ArticlesRepository implements ArticlesDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Article> getAllArticles(SortByEnum validatedSortBy, List<String> tags) throws DataAccessException {
        final String sortBy = validatedSortBy.option();

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
                    ORDER BY article.Updated %s;
                """, sortBy),
                new ArticleExtractor()
            );
        }

        final String placeholder = tags.stream()
            .map(tag -> "?")
            .collect(Collectors.joining(","));

        List<Object> tagsParams = new ArrayList<>(tags);
        tagsParams.add(tags.size());

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
                    SELECT articleTag2.ArticleId
                    FROM ArticleTags articleTag2
                    JOIN Tags tag2 ON articleTag2.TagId = tag2.Id
                    WHERE tag2.TagName IN (%s)
                    GROUP BY articleTag2.ArticleId
                    HAVING COUNT(DISTINCT tag2.TagName) = ?
                )
                ORDER BY article.Updated %s;
            """, placeholder, sortBy),
            new ArticleExtractor(),
            tagsParams.toArray()
        );
    }

    @Override
    public Optional<Article> getArticle(Integer id) throws DataAccessException {
        final List<Article> articles = jdbcTemplate.query(
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
            new ArticleExtractor(),
            id
        );

        return articles
            .stream()
            .findFirst();
    };


    @Override
    @Transactional
    public void addArticle(Article article) throws DataAccessException {
        final SimpleJdbcInsert insertIntoArticles = new SimpleJdbcInsert(jdbcTemplate)
            .withTableName("Articles")
            .usingGeneratedKeyColumns("Id")
            .usingColumns("Title", "Subtitle", "Content");

        final Map<String, Object> articleArgs = new HashMap<>();
        articleArgs.put("title", article.title());
        articleArgs.put("subtitle", article.subtitle());
        articleArgs.put("content", article.content());

        final Number articleId = insertIntoArticles.executeAndReturnKey(articleArgs);

        final List<String> tags = article.tags();
        if (tags == null || tags.isEmpty())
            return;

        insertTags(tags);
        insertArticleTags(articleId.intValue(), tags);
    };

    @Override
    @Transactional
    public void updateArticle(Integer id, Article newArticle) throws DataAccessException {
        jdbcTemplate.update(
            """
                UPDATE Articles SET 
                    Title = ?, 
                    Subtitle = ?, 
                    Content = ?,
                    Updated = CURRENT_TIMESTAMP
                WHERE Id = ?;
            """,
            newArticle.title(),
            newArticle.subtitle(),
            newArticle.content(),
            id
        );

        jdbcTemplate.update(
            "DELETE FROM ArticleTags WHERE ArticleId = ?;",
            id
        );

        jdbcTemplate.update(
            """
                DELETE FROM Tags
                WHERE NOT EXISTS (
                    SELECT 1 FROM ArticleTags WHERE Tags.Id = ArticleTags.TagId
                );        
            """
        );

        final List<String> tags = newArticle.tags();
        if (tags == null || tags.isEmpty())
            return;

        insertTags(tags);
        insertArticleTags(id, tags);
    }

    @Override
    @Transactional
    public void deleteArticle(Integer id) throws DataAccessException {
        jdbcTemplate.update(
            """
                DELETE FROM Articles WHERE Id = ?;
            """,
            id
        );
    }


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
