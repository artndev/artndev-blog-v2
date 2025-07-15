package com.blog.blog.interfaces;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.blog.blog.instances.Tag;

public interface TagsDao {
    public List<Tag> getAllTags() throws DataAccessException;

}
