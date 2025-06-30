package com.blog.blog;

public class Article {
    // CREATE TABLE Article (
    //     id INT PRIMARY KEY,
    //     title VARCHAR(255),
    //     subtitle VARCHAR(255),
    //     content TEXT
    // );

    private int id;
    private String title;
    private String subtitle;
    private String content;

    public Article(int id, String title, String subtitle, String content) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getContent() {
        return content;
    }
}
