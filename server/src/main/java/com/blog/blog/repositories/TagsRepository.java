package com.blog.blog.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.blog.blog.interfaces.TagsDao;
import com.blog.blog.records.Tag;
import com.blog.blog.services.mappers.TagRowMapper;

@Repository
public class TagsRepository implements TagsDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Tag> getAllTags() throws DataAccessException {
        return jdbcTemplate.query(
            """
               SELECT * FROM Tags;
            """,
            new TagRowMapper()
        );
    }
    
}
