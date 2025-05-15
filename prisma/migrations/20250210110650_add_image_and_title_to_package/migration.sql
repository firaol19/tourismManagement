/*
  Warnings:

  - You are about to drop the column `noPerson` on the `package` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `package` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - Added the required column `image` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `package` DROP COLUMN `noPerson`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `price` VARCHAR(191) NOT NULL;
