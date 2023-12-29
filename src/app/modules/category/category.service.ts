import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  if (await Category.isCategoryExists(payload.name)) {
    throw new Error("The category already exists");
  }
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find({}, { __v: 0 });
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id, { __v: 0 });
  if (!result) {
    throw new Error("The category doesn't exist");
  }
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
};
