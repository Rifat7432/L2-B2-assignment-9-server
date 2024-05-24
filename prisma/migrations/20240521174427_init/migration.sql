/*
  Warnings:

  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "photos" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL;
