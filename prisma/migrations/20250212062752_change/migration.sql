/*
  Warnings:

  - You are about to alter the column `interance` on the `destination` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `destination` MODIFY `interance` INTEGER NOT NULL;
