-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'EDITEUR') NOT NULL DEFAULT 'EDITEUR';

-- Les comptes créés avant l'arrivée des rôles gardent un accès complet
UPDATE `user` SET `role` = 'ADMIN';
