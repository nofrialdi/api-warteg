/*
  Warnings:

  - You are about to drop the column `completed` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('PROCESSING', 'DELIVERED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "completed",
ADD COLUMN     "status" "StatusOrder" NOT NULL DEFAULT 'PROCESSING';
