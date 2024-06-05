import { prisma } from '../../../app';
import { paginationHelper } from '../../../helper/pagination';
import { searchFields } from './pet.constant';
import { TPagination } from '../../interface/pagination';
import { TFilterPet } from './pet.interface';
import { Pet, PetStatus, Prisma } from '@prisma/client';
// create pet service
const createPetIntoDB = async (payload: Pet) => {
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};
// get all pet service
const getAllPetsFromDB = async (query: TFilterPet, options: TPagination) => {
  const { searchTerm, ...filterData } = query;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const andCondition: Prisma.PetWhereInput[] = [
    { status: PetStatus.AVAILABLE },
  ];
  if (searchTerm) {
    if (Number(searchTerm)) {
      andCondition.push({
        OR: [
          {
            age: {
              equals: Number(searchTerm),
            },
          },
        ],
      });
    }
    if (!Number(searchTerm)) {
      andCondition.push({
        OR: searchFields.map((filed) => ({
          [filed]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereCondition: Prisma.PetWhereInput = { AND: andCondition };
  const result = await prisma.pet.findMany({
    where: whereCondition,
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.pet.count({ where: whereCondition });
  return {
    meta: { page, limit, total },
    data: result,
  };
};
// update pet service
const getPetFromDB = async (id: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id,
      status: {
        not: PetStatus.REMOVED,
      },
    },
  });
  return result;
};

// update pet service
const updatePetIntoDB = async (id: string, petData: Partial<Pet>) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
      status: PetStatus.AVAILABLE,
    },
  });
  const result = await prisma.pet.update({
    where: {
      id,
    },
    data: petData,
  });
  return result;
};
const deletePetIntoDB = async (id: string) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
      species: PetStatus.AVAILABLE,
    },
  });
  const result = await prisma.pet.update({
    where: {
      id,
    },
    data: { status: PetStatus.REMOVED },
  });
  return result;
};
export const petServices = {
  createPetIntoDB,
  getPetFromDB,
  getAllPetsFromDB,
  updatePetIntoDB,
  deletePetIntoDB,
};
