import { AdoptionRequest, PetStatus, RequestStatus } from '@prisma/client';
import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../../errors/appErrors';
import httpStatus from 'http-status';
// adoption request service
const createAdoptionRequestIntoDB = async (
  payload: JwtPayload,
  adoptionData: AdoptionRequest,
) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id: adoptionData.petId,
    },
  });
  const isRequestExist = await prisma.adoptionRequest.findFirst({
    where: {
      petId: adoptionData.petId,
      userId: payload.userId,
    },
  });

  if (isRequestExist) {
    throw new AppError(httpStatus.ALREADY_REPORTED, 'Request already exist');
  }
  const result = await prisma.adoptionRequest.create({
    data: {
      ...adoptionData,
      userId: payload.userId,
    },
  });
  return result;
};
// get adoption request service
const getAllAdoptionRequestFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany({
    where: {
      status: RequestStatus.PENDING,
    },
    include: {
      pet: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          photo: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  return result;
};
// update adoption request service
const updateStatusAdoptionRequestIntoDB = async (
  id: string,
  status: { status: RequestStatus },
) => {
  const request = await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (status.status === RequestStatus.APPROVED) {
    const result = await prisma.$transaction(async (tx) => {
      const updateRequest = await tx.adoptionRequest.update({
        where: {
          id,
        },
        data: status,
      });
      const updatePet = await tx.pet.update({
        where: {
          id: request.petId,
        },
        data: { status: PetStatus.ADOPTED },
      });

      return { updatePet, updateRequest };
    });
    return result;
  }
  const result = await prisma.adoptionRequest.update({
    where: {
      id,
    },
    data: status,
  });
  return result;
};
const getPetsOfUserFromDB = async (id: string) => {
  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: id,
      status: RequestStatus.APPROVED,
    },
    include: {
      pet: true,
    },
  });
  return result;
};
const getUnapprovedRequestOfUserFromDB = async (id: string) => {
  const result = await prisma.adoptionRequest.findMany({
    where: {
      AND: [
        { userId: id },
        {
          OR: [
            { status: RequestStatus.PENDING },
            { status: RequestStatus.REJECTED },
          ],
        },
      ],
    },

    include: {
      pet: true,
    },
  });
  return result;
};
export const adoptionRequestServices = {
  createAdoptionRequestIntoDB,
  getAllAdoptionRequestFromDB,
  updateStatusAdoptionRequestIntoDB,
  getPetsOfUserFromDB,
  getUnapprovedRequestOfUserFromDB,
};
