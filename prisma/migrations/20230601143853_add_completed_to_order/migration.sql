/*
  Warnings:

  - You are about to drop the column `menuId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "menuId",
DROP COLUMN "totalPrice",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "name",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
