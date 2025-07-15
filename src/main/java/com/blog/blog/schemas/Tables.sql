-- Articles table
CREATE TABLE Articles (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    Subtitle VARCHAR(255),
    Content TEXT,
    Updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE Tags (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    TagName VARCHAR(100) UNIQUE NOT NULL
);

-- Join table to implement many-to-many relationship
CREATE TABLE ArticleTags (
    ArticleId INT NOT NULL,
    TagId INT NOT NULL,
    PRIMARY KEY (ArticleId, TagId),
    FOREIGN KEY (ArticleId) REFERENCES Articles(Id) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES Tags(Id) ON DELETE CASCADE
);
