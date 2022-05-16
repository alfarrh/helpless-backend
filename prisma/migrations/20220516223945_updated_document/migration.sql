/*
  Warnings:

  - Added the required column `description` to the `document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group` to the `document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "group" TEXT NOT NULL,
ADD COLUMN     "hours" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
