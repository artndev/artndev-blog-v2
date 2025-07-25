package com.blog.blog.services.row_mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.lang.NonNull;

import com.blog.blog.records.Article;

public class ArticleExtractor implements ResultSetExtractor<List<Article>> {
    @Override
    public List<Article> extractData(@NonNull ResultSet rs) throws SQLException {
        Map<Integer, Article> articles = new LinkedHashMap<>();

        while (rs.next()) {
            final Integer articleId = rs.getInt("article_id");

            final Article article = articles.computeIfAbsent(articleId, id -> {
                try {
                    final String title = rs.getString("Title");
                    final String subtitle = rs.getString("Subtitle");
                    final String content = rs.getString("Content");
                    final Timestamp updated = rs.getTimestamp("Updated");

                    return new Article(id, title, subtitle, content, updated, new ArrayList<>());
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            });

            final String tag = rs.getString("TagName");
            article.addTag(tag);
        }

        return new ArrayList<>(articles.values());
    
    }
}
