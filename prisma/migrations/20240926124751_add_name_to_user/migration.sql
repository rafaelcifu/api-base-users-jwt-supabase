/*
  Warnings:

  - You are about to drop the column `name` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "name";
