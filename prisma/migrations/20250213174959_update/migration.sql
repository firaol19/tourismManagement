/*
  Warnings:

  - You are about to drop the column `aNoPerson` on the `bookedservice` table. All the data in the column will be lost.
  - You are about to drop the column `tNoPerson` on the `bookedservice` table. All the data in the column will be lost.
  - Added the required column `numberPerson` to the `BookedService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `BookedService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookedservice` DROP COLUMN `aNoPerson`,
    DROP COLUMN `tNoPerson`,
    ADD COLUMN `numberPerson` INTEGER NOT NULL,
    ADD COLUMN `time` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `BookedPackage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageId` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `numberPerson` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookedPackage` ADD CONSTRAINT `BookedPackage_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookedPackage` ADD CONSTRAINT `BookedPackage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
