/*
  Warnings:

  - You are about to drop the column `canceledpackageid` on the `cancelbook` table. All the data in the column will be lost.
  - You are about to drop the column `canceledserviceId` on the `cancelbook` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cancelbook` DROP FOREIGN KEY `Cancelbook_canceledpackageid_fkey`;

-- DropForeignKey
ALTER TABLE `cancelbook` DROP FOREIGN KEY `Cancelbook_canceledserviceId_fkey`;

-- DropIndex
DROP INDEX `Cancelbook_canceledpackageid_fkey` ON `cancelbook`;

-- DropIndex
DROP INDEX `Cancelbook_canceledserviceId_fkey` ON `cancelbook`;

-- AlterTable
ALTER TABLE `cancelbook` DROP COLUMN `canceledpackageid`,
    DROP COLUMN `canceledserviceId`,
    ADD COLUMN `canceledAccommodationId` INTEGER NULL,
    ADD COLUMN `canceledPackageId` INTEGER NULL,
    ADD COLUMN `canceledServiceId` INTEGER NULL,
    ADD COLUMN `canceledTourGuideId` INTEGER NULL,
    ADD COLUMN `canceledTransportationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Cancelbook` ADD CONSTRAINT `Cancelbook_canceledServiceId_fkey` FOREIGN KEY (`canceledServiceId`) REFERENCES `BookedService`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancelbook` ADD CONSTRAINT `Cancelbook_canceledAccommodationId_fkey` FOREIGN KEY (`canceledAccommodationId`) REFERENCES `Accommodation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancelbook` ADD CONSTRAINT `Cancelbook_canceledTransportationId_fkey` FOREIGN KEY (`canceledTransportationId`) REFERENCES `Transportation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancelbook` ADD CONSTRAINT `Cancelbook_canceledTourGuideId_fkey` FOREIGN KEY (`canceledTourGuideId`) REFERENCES `TourGuide`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancelbook` ADD CONSTRAINT `Cancelbook_canceledPackageId_fkey` FOREIGN KEY (`canceledPackageId`) REFERENCES `BookedPackage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
