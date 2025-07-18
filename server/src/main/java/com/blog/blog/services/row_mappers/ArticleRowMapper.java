package com.blog.blog.services.row_mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.blog.blog.instances.Article;

public class ArticleRowMapper implements RowMapper<Article> {
    @Override
    public Article mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        return map(rs);
    }

    private Article map(@NonNull ResultSet rs) throws SQLException {
        final Integer id = rs.getInt("Id");
        final String title = rs.getString("Title");
        final String subtitle = rs.getString("Subtitle");
        final String content = rs.getString("Content");
        final Timestamp updated = rs.getTimestamp("Updated");

        return new Article(id, title, subtitle, content, updated);
    }
}
