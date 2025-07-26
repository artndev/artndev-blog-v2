package com.blog.blog.enums;

public enum SortByEnum {
    ASC("ASC"),
    DESC("DESC");

    private final String option;

    SortByEnum(String option) {
        this.option = option;
    }

    public String option() {
        return this.option;
    }
}
