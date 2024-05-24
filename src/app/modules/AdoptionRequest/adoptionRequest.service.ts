import { AdoptionRequest, RequestStatus } from '@prisma/client';
import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
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
  const result = await prisma.adoptionRequest.create({
    data: { ...adoptionData, userId: payload.userId },
  });
  return result;
};
// get adoption request service
const getAllAdoptionRequestFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany({});
  return result;
};
// update adoption request service
const updateStatusAdoptionRequestIntoDB = async (
  id: string,
  status: { status: RequestStatus },
) => {
  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.adoptionRequest.update({
    where: {
      id,
    },
    data: status,
  });
  return result;
};

export const adoptionRequestServices = {
  createAdoptionRequestIntoDB,
  getAllAdoptionRequestFromDB,
  updateStatusAdoptionRequestIntoDB,
};
