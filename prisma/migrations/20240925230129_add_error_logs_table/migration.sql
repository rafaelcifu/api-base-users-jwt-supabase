/*
  Warnings:

  - You are about to drop the `ErrorLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ErrorLog";

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
