-- CreateEnum
CREATE TYPE "FoodStatus" AS ENUM ('Fresh', 'Warning', 'Spoiled');

-- AlterTable
ALTER TABLE "SensorData" ADD COLUMN     "status" "FoodStatus" NOT NULL DEFAULT 'Fresh';
