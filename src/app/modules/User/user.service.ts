import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import { User, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TFileImage } from '../../interface/imageReaponce';
import { sendImageToCloudinary } from '../../../shared/uploadImage';
// register user service
const createUserIntoDB = async (userData: User, file: TFileImage) => {
  if (file) {
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(path);
    userData.photo = secure_url;
  }
  const { password, ...restData } = userData;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string),
  );
  const result = await prisma.user.create({
    data: { ...restData, password: hashedPassword,role:UserRole.USER },
    select: {
      id: true,
      name: true,
      email: true,
      photo:true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
const createAdminIntoDB = async (userData: User, file: TFileImage) => {
  if (file) {
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(path);
    userData.photo = secure_url;
  }
  const { password, ...restData } = userData;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string),
  );
  const result = await prisma.user.create({
    data: { ...restData, password: hashedPassword,role:UserRole.ADMIN },
    select: {
      id: true,
      name: true,
      email: true,
      photo:true,
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
  const result = await prisma.user.update({
    where: {
      id: userInfo.userId,
    },
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      photo:true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
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
      photo:true,
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
