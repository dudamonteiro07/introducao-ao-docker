-- CreateTable
CREATE TABLE "public"."Books" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "genre" TEXT,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);
