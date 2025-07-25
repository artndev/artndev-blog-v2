package com.blog.blog.services.row_mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.blog.blog.records.Tag;

public class TagRowMapper implements RowMapper<Tag> {
    @Override
    public Tag mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        return map(rs);
    }

    private Tag map(@NonNull ResultSet rs) throws SQLException {
        final Integer id = rs.getInt("Id");
        final String tagName = rs.getString("TagName");

        return new Tag(id, tagName);
    }
}

