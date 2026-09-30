-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'EDITEUR') NOT NULL DEFAULT 'EDITEUR';

-- CreateIndex
CREATE INDEX `account_userId_idx` ON `account`(`userId`(191));

-- CreateIndex
CREATE INDEX `session_userId_idx` ON `session`(`userId`(191));

-- Les comptes créés avant l'arrivée des rôles gardent un accès complet
UPDATE `user` SET `role` = 'ADMIN';
