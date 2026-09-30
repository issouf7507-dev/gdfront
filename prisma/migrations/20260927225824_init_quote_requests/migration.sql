-- CreateTable
CREATE TABLE `QuoteRequest` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `company` VARCHAR(150) NULL,
    `service` VARCHAR(50) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('NOUVEAU', 'CONTACTE', 'DEVIS_ENVOYE', 'GAGNE', 'PERDU') NOT NULL DEFAULT 'NOUVEAU',
    `notes` TEXT NULL,
    `utmSource` VARCHAR(300) NULL,
    `utmMedium` VARCHAR(300) NULL,
    `utmCampaign` VARCHAR(300) NULL,
    `utmTerm` VARCHAR(300) NULL,
    `utmContent` VARCHAR(300) NULL,
    `gclid` VARCHAR(300) NULL,
    `landingPage` VARCHAR(300) NULL,
    `referrer` VARCHAR(300) NULL,
    `ipHash` CHAR(64) NULL,
    `emailSent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `QuoteRequest_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `QuoteRequest_createdAt_idx`(`createdAt`),
    INDEX `QuoteRequest_ipHash_createdAt_idx`(`ipHash`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
