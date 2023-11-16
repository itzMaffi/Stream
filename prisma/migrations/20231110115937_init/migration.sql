-- CreateTable
CREATE TABLE `Thought` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), -- TODO: Consider change it to timestamp in UTC
    `updatedAt` DATETIME(3) NOT NULL, -- TODO: Consider change it to timestamp in UTC
    `thoughtString` VARCHAR(500) NOT NULL, -- TODO: increase text capacity or change it to TEXT type
    `thoughtTimeline` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
