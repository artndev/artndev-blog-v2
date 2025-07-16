package com.blog.blog.instances;

import java.util.List;

public class ArticleTags extends Article {
    private List<String> tags;

    public ArticleTags(Integer id, String title, String subtitle, String content, List<String> tags, String updated) {
        super(id, title, subtitle, content, updated);
        this.tags = tags;
    }

    public List<String> getTags() {
        return this.tags;
    }

    public void addTag(String tag) {
        if (tag == null || this.tags.contains(tag))
            return;

        this.tags.add(tag);
    }
}
