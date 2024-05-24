type IOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;

  let sortBy: string = 'createdAt';
  let sortOrder: string = 'desc';
  if (
    options.sortBy === 'species' ||
    options.sortBy === 'breed' ||
    options.sortBy === 'size'
  ) {
    sortBy = options.sortBy;
  }
  if (options.sortOrder === 'desc' || options.sortOrder === 'asc') {
    sortOrder = options.sortOrder;
  }

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
