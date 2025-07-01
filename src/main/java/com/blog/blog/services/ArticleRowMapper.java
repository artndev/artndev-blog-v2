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
        final String title = rs.getString("title");
        final String subtitle = rs.getString("subtitle");
        final String content = rs.getString("content");

        return new Article(title, subtitle, content);
    }
}
