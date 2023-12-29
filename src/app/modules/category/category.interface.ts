import { Model } from "mongoose";

export interface TCategory {
  name: string;
}
export interface CategoryModel extends Model<TCategory> {
  isCategoryExists(name: string): Promise<TCategory | null>;
}
