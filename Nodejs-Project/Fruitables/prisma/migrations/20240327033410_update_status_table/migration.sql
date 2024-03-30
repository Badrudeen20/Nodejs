/*
  Warnings:

  - You are about to alter the column `status` on the `bands` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `bands` MODIFY `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE';
