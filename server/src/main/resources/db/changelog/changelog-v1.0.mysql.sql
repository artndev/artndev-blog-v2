-- liquibase formatted sql

-- changeset agres:1753454053781-1
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) from information_schema.tables WHERE table_name = 'ArticleTags';
CREATE TABLE ArticleTags (ArticleId INT NOT NULL, TagId INT NOT NULL, CONSTRAINT PK_ARTICLETAGS PRIMARY KEY (ArticleId, TagId));

-- changeset agres:1753454053781-2
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) from information_schema.tables WHERE table_name = 'Articles';
CREATE TABLE Articles (Id INT AUTO_INCREMENT NOT NULL, Title VARCHAR(255) NULL, Subtitle VARCHAR(255) NULL, Content TEXT NULL, Updated timestamp DEFAULT NOW() NOT NULL, CONSTRAINT PK_ARTICLES PRIMARY KEY (Id));

-- changeset agres:1753454053781-3
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) from information_schema.tables WHERE table_name = 'Tags';
CREATE TABLE Tags (Id INT AUTO_INCREMENT NOT NULL, TagName VARCHAR(100) NOT NULL, CONSTRAINT PK_TAGS PRIMARY KEY (Id), UNIQUE (TagName));

-- changeset agres:1753454053781-4
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'ArticleTags' AND index_name = 'TagId';
CREATE INDEX TagId ON ArticleTags(TagId);

-- changeset agres:1753454053781-5
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) from information_schema.constraints WHERE constraint_name = 'ArticleTags_ibfk_1' AND table_name = 'ArticleTags';
ALTER TABLE ArticleTags ADD CONSTRAINT ArticleTags_ibfk_1 FOREIGN KEY (ArticleId) REFERENCES Articles (Id) ON UPDATE RESTRICT ON DELETE CASCADE;

-- changeset agres:1753454053781-6
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) from information_schema.constraints WHERE constraint_name = 'ArticleTags_ibfk_2' AND table_name = 'ArticleTags';
ALTER TABLE ArticleTags ADD CONSTRAINT ArticleTags_ibfk_2 FOREIGN KEY (TagId) REFERENCES Tags (Id) ON UPDATE RESTRICT ON DELETE CASCADE;

-- changeset agres:1753454053781-7
-- comment: Create trigger to remove orphan tags after article deletion
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = DATABASE() AND trigger_name = 'after_article_delete';
CREATE TRIGGER after_article_delete
AFTER DELETE ON Articles
FOR EACH ROW
BEGIN
  DELETE FROM Tags
  WHERE NOT EXISTS (
    SELECT 1 FROM ArticleTags WHERE Tags.Id = ArticleTags.TagId
  );
END;
-- rollback DROP TRIGGER after_article_delete;