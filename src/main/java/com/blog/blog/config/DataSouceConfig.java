package com.blog.blog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class DataSouceConfig {
    @Autowired
    private ConnectionPoolConfig connectionPoolConfig;

    @Bean
    @Primary
    HikariDataSource hikariDataSource() {
        return new HikariDataSource(connectionPoolConfig.hikariConfig());
    }
}