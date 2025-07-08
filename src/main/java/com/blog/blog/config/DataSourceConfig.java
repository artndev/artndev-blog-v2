package com.blog.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class DataSourceConfig {
    @Value("${db.URL}")
    private String DB_URL;

    @Value("${db.USERNAME}")
    private String DB_USERNAME;

    @Value("${db.PASSWORD}")
    private String DB_PASSWORD;

    @Bean
    @Primary
    HikariDataSource hikariDataSource() {
        HikariConfig hikariConfig = new HikariConfig();

        hikariConfig.setJdbcUrl(DB_URL);
        hikariConfig.setUsername(DB_USERNAME);
        hikariConfig.setPassword(DB_PASSWORD);  
        // hikariConfig.setDriverClassName("com.mysql.cj.jdbc.Driver");
        hikariConfig.setMaximumPoolSize(20);
        hikariConfig.setConnectionTimeout(30000); // 30s      
        hikariConfig.setIdleTimeout(18000000); // 5h    
        hikariConfig.setMaxLifetime(18000000); // 5h

        return new HikariDataSource(hikariConfig);
    }

    @Bean
    JdbcTemplate jdbcTemplate(HikariDataSource hikariDataSource) {
        JdbcTemplate jdbc = new JdbcTemplate();
        jdbc.setDataSource(hikariDataSource);
        jdbc.setQueryTimeout(30000); // 30s

        return jdbc;
    }
}