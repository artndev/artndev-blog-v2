package com.blog.blog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.blog.blog.instances.Tag;
import com.blog.blog.interfaces.TagsDao;

@Service
public class TagsService {
    @Autowired
    private TagsDao tagsDao;

    public List<Tag> getAllTags() throws DataAccessException {
        return tagsDao.getAllTags();
    }
}
