-- AlterTable
ALTER TABLE `accommodation` ADD COLUMN `available` VARCHAR(191) NOT NULL DEFAULT '10';

-- AlterTable
ALTER TABLE `bookedservice` ADD COLUMN `returnTransportationId` INTEGER NULL;

-- AlterTable
ALTER TABLE `package` ADD COLUMN `available` VARCHAR(191) NOT NULL DEFAULT '8';

-- AlterTable
ALTER TABLE `transportation` ADD COLUMN `totalcar` VARCHAR(191) NOT NULL DEFAULT '7';

-- AddForeignKey
ALTER TABLE `BookedService` ADD CONSTRAINT `BookedService_returnTransportationId_fkey` FOREIGN KEY (`returnTransportationId`) REFERENCES `Transportation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
