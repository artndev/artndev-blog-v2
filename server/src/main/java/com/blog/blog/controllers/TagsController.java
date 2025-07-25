package com.blog.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.ServerResponse;
import com.blog.blog.records.Tag;
import com.blog.blog.services.TagsService;

@CrossOrigin(
    origins = "*", 
    methods = {
        RequestMethod.GET, 
        RequestMethod.POST, 
        RequestMethod.PUT, 
        RequestMethod.DELETE
    }, 
    maxAge = 3600
)
@RestController
@RequestMapping("/api/v1/tags")
public class TagsController {
    @Autowired
    private TagsService tagsService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ServerResponse<List<Tag>>> getAllTags() {
        final List<Tag> tags = tagsService.getAllTags();

        return ResponseEntity.ok(
            new ServerResponse<List<Tag>>("Tags have been got successfully", tags)  
        );  
    }
}
