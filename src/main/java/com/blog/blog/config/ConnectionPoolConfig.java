package com.blog.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.zaxxer.hikari.HikariConfig;

@Configuration
public class ConnectionPoolConfig {
    @Value("${db.URL}")
    private String DB_URL;

    @Value("${db.USERNAME}")
    private String DB_USERNAME;

    @Value("${db.PASSWORD}")
    private String DB_PASSWORD;

    @Bean
    @Primary
    HikariConfig hikariConfig() {
        HikariConfig config = new HikariConfig();

        config.setJdbcUrl(DB_URL);
        config.setUsername(DB_USERNAME);
        config.setPassword(DB_PASSWORD);  
        config.setDriverClassName("com.mysql.jdbc.Driver");

        return config;
    }
}
