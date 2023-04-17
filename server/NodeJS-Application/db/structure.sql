CREATE TABLE "User" (
  "userId" bigint generated always as identity,
  "username" varchar(64) NOT NULL,
  "email" varchar(64) NOT NULL,
  "password" varchar(64) NOT NULL,
  "img" varchar NOT NULL
);

ALTER TABLE "User" ADD CONSTRAINT "pkUser" PRIMARY KEY ("userId");
CREATE UNIQUE INDEX "akUserUsername" ON "User" ("username");
CREATE UNIQUE INDEX "akUserEmail" ON "User" ("email");

CREATE TABLE "Post" (
  "postId" bigint generated always as identity,
  "title" varchar NOT NULL,
  "desc" varchar NOT NULL,
  "img" varchar NOT NULL,
  "date" date NOT NULL,
  "uidId" bigint NOT NULL
);

ALTER TABLE "Post" ADD CONSTRAINT "pkPost" PRIMARY KEY ("postId");
CREATE UNIQUE INDEX "akPostTitle" ON "Post" ("title");
ALTER TABLE "Post" ADD CONSTRAINT "fkPostUid" FOREIGN KEY ("uidId") REFERENCES "User" ("userId");
