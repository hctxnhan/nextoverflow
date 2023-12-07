ALTER TABLE "Question" ADD COLUMN ts tsvector
    GENERATED ALWAYS AS
     (setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
     setweight(to_tsvector('english', coalesce(content, '')), 'B')) STORED;
	 
CREATE INDEX ts_idx ON "Question" USING GIN (ts);

SELECT title, content
FROM "Question"
WHERE ts @@ to_tsquery('english', 'learning');

ALTER TABLE "Tag" ADD COLUMN ts tsvector
    GENERATED ALWAYS AS
     (setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
     setweight(to_tsvector('english', coalesce(description, '')), 'B')) STORED;

CREATE INDEX ts_idx_tag ON "Tag" USING GIN (ts);

ALTER TABLE "User" ADD COLUMN ts tsvector
    GENERATED ALWAYS AS
     (setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
     setweight(to_tsvector('english', coalesce(username, '')), 'B')) STORED;

CREATE INDEX ts_idx_user ON "User" USING GIN (ts);