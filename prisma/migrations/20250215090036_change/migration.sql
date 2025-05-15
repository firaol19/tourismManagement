-- AddForeignKey
ALTER TABLE `Cancelbook` ADD CONSTRAINT `Cancelbook_canceledserviceId_fkey` FOREIGN KEY (`canceledserviceId`) REFERENCES `BookedService`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancelbook` ADD CONSTRAINT `Cancelbook_canceledpackageid_fkey` FOREIGN KEY (`canceledpackageid`) REFERENCES `BookedPackage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
