/*
  Warnings:

  - Made the column `status` on table `bookedservice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bookedservice` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
