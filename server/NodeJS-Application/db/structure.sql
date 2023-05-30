CREATE TABLE "Account" (
  "accountId" bigint generated always as identity,
  "name" varchar(64) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password" varchar NOT NULL
);

ALTER TABLE "Account" ADD CONSTRAINT "pkAccount" PRIMARY KEY ("accountId");
CREATE UNIQUE INDEX "akAccountName" ON "Account" ("name");
CREATE UNIQUE INDEX "akAccountEmail" ON "Account" ("email");

CREATE TABLE "Post" (
  "postId" bigint generated always as identity,
  "title" varchar NOT NULL,
  "body" text NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "authorId" bigint NOT NULL
);

ALTER TABLE "Post" ADD CONSTRAINT "pkPost" PRIMARY KEY ("postId");
CREATE UNIQUE INDEX "akPostTitle" ON "Post" ("title");
ALTER TABLE "Post" ADD CONSTRAINT "fkPostAuthor" FOREIGN KEY ("authorId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;

CREATE TABLE "Category" (
  "categoryId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "postId" bigint NOT NULL
);

ALTER TABLE "Category" ADD CONSTRAINT "pkCategory" PRIMARY KEY ("categoryId");
ALTER TABLE "Category" ADD CONSTRAINT "fkCategoryPost" FOREIGN KEY ("postId") REFERENCES "Post" ("postId") ON DELETE CASCADE;

CREATE TABLE "Comment" (
  "commentId" bigint generated always as identity,
  "message" varchar NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" bigint NOT NULL,
  "postId" bigint NOT NULL,
  "parent_id" integer NOT NULL
);

ALTER TABLE "Comment" ADD CONSTRAINT "pkComment" PRIMARY KEY ("commentId");
CREATE UNIQUE INDEX "akCommentMessage" ON "Comment" ("message");
ALTER TABLE "Comment" ADD CONSTRAINT "fkCommentUser" FOREIGN KEY ("userId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "fkCommentPost" FOREIGN KEY ("postId") REFERENCES "Post" ("postId") ON DELETE CASCADE;

CREATE TABLE "File" (
  "fileId" bigint generated always as identity,
  "file_path" varchar NOT NULL,
  "postId" bigint NOT NULL
);

ALTER TABLE "File" ADD CONSTRAINT "pkFile" PRIMARY KEY ("fileId");
ALTER TABLE "File" ADD CONSTRAINT "fkFilePost" FOREIGN KEY ("postId") REFERENCES "Post" ("postId") ON DELETE CASCADE;

CREATE TABLE "comment_like" (
  "comment_likeId" bigint generated always as identity,
  "userId" bigint NOT NULL,
  "commentId" bigint NOT NULL
);

ALTER TABLE "comment_like" ADD CONSTRAINT "pkcomment_like" PRIMARY KEY ("comment_likeId");
ALTER TABLE "comment_like" ADD CONSTRAINT "fkcomment_likeUser" FOREIGN KEY ("userId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "comment_like" ADD CONSTRAINT "fkcomment_likeComment" FOREIGN KEY ("commentId") REFERENCES "Comment" ("commentId") ON DELETE CASCADE;
