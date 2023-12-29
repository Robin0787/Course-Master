import { Schema, model } from "mongoose";
import { CategoryModel, TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory, CategoryModel>({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.statics.isCategoryExists = async (name: string) => {
  const category = await Category.findOne({ name });
  return category;
};

export const Category = model<TCategory, CategoryModel>(
  "category",
  categorySchema
);
