/*
  Warnings:

  - The values [CHECKOUT,PAYMADE,PAYINPROGRESS,PAYCANCLE,PAYDONE] on the enum `orders_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `cartId` TEXT NULL,
    MODIFY `status` ENUM('CART', 'SHOP') NOT NULL DEFAULT 'CART';

-- CreateTable
CREATE TABLE `shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `cartId` TEXT NOT NULL,
    `price` FLOAT NOT NULL,
    `discount` FLOAT NOT NULL DEFAULT 0,
    `status` ENUM('PAYMADE', 'PAYINPROGRESS', 'PAYCANCLE', 'PAYDONE') NOT NULL DEFAULT 'PAYMADE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shops` ADD CONSTRAINT `shops_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
