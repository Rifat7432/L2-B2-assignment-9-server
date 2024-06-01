import { Pet, Prisma } from '@prisma/client';
import { prisma } from '../../../app';
import { paginationHelper } from '../../../helper/pagination';
import { searchFields } from './pet.constant';
import { TPagination } from '../../interface/pagination';
import { TFilterPet } from './pet.interface';
// create pet service
const createPetIntoDB = async (payload: Pet) => {
  // if (files.length) {
  //   const photos = await files.map(async (file) => {
  //     const path = file.path;
  //     const { secure_url } = await sendImageToCloudinary(path);
  //     return secure_url;
  //   });
  //   await Promise.all(photos).then((photo) => (payload.photos = photo));
  // }
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
  const andCondition: Prisma.PetWhereInput[] = [];
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
    },
  });
  return result;
};

// update pet service
const updatePetIntoDB = async (id: string, petData: Partial<Pet>) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
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
export const petServices = {
  createPetIntoDB,
  getPetFromDB,
  getAllPetsFromDB,
  updatePetIntoDB,
};
