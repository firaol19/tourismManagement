/*
  Warnings:

  - You are about to drop the column `cancedbookid` on the `cancelbook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cancelbook` DROP COLUMN `cancedbookid`,
    ADD COLUMN `canceledpackageid` INTEGER NULL,
    ADD COLUMN `canceledserviceId` INTEGER NULL;
