-- CreateEnum
CREATE TYPE "PetStatus" AS ENUM ('AVAILABLE', 'ADOPTED', 'REMOVED');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "status" "PetStatus" NOT NULL DEFAULT 'AVAILABLE';
