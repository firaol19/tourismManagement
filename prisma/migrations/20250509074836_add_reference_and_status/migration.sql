/*
  Warnings:

  - Added the required column `reference` to the `BookedService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookedservice` ADD COLUMN `reference` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NULL;
