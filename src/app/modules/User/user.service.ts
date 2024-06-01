import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import { User, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from '../Auth/auth.utils';

// register user service
const createUserIntoDB = async (userData: User) => {
  const { password, ...restData } = userData;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string),
  );
  const result = await prisma.user.create({
    data: { ...restData, password: hashedPassword, role: UserRole.USER },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
const createAdminIntoDB = async (userData: User) => {
  const { password, ...restData } = userData;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string),
  );
  const result = await prisma.user.create({
    data: { ...restData, password: hashedPassword, role: UserRole.ADMIN },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
// update user service
const updateUserIntoDB = async (
  userInfo: JwtPayload,
  userData: Partial<User>,
) => {
  const userUpdatedData = await prisma.user.update({
    where: {
      id: userInfo.userId,
    },
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const jwtPayload = {
    userId: userUpdatedData.id,
    email: userUpdatedData.email,
    photo: userUpdatedData.photo,
    role: userUpdatedData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};
//get a user service
const getUserFromDB = async (userData: JwtPayload) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userData.userId,
    },
    select: {
      id: true,
      name: true,
      photo: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
export const userService = {
  createUserIntoDB,
  createAdminIntoDB,
  getUserFromDB,
  updateUserIntoDB,
};
