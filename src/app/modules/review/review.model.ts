import { Schema, model } from "mongoose";
import { Course } from "../course/course.model";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

reviewSchema.pre("save", async function () {
  const result: any = await Course.findById(this?.courseId);
  if (!result) {
    throw new Error("The course doesn't exist");
  }
  return result;
});

export const Review = model<TReview>("review", reviewSchema);
