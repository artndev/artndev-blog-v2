package com.blog.blog.services;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.blog.blog.Article;

public class ArticleRowMapper implements RowMapper<Article> {
    @Override
    public Article mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        return map(rs);
    }

    private Article map(@NonNull ResultSet rs) throws SQLException {
        final Integer id = rs.getInt("Id");
        final String updated = rs.getString("Updated");
        final String title = rs.getString("Title");
        final String subtitle = rs.getString("Subtitle");
        final String content = rs.getString("Content");
        final String tags = rs.getString("Tags");

        return new Article(id, title, subtitle, content, updated, tags);
    }
}
