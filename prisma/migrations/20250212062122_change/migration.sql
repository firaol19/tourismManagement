/*
  Warnings:

  - Added the required column `interance` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noperson` to the `Transportation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destination` ADD COLUMN `interance` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transportation` ADD COLUMN `noperson` INTEGER NOT NULL;
