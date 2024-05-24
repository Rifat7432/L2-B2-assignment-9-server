"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    let sortBy = 'createdAt';
    let sortOrder = 'desc';
    if (options.sortBy === 'species' ||
        options.sortBy === 'breed' ||
        options.sortBy === 'size') {
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
exports.paginationHelper = {
    calculatePagination,
};
