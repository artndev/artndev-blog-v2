package com.blog.blog;

public class ArticlesResponse<T> {
    private String message;
    private T answer;

    public ArticlesResponse(String message, T answer) {
        this.message = message;
        this.answer = answer;
    }

    public String getMessage() {
        return message;
    }

    public T getAnswer() {
        return answer;
    }
}
