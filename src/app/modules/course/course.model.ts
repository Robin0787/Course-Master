import { Schema, model } from "mongoose";
import { Category } from "../category/category.model";
import { CourseModel, TCourse } from "./course.interface";

const courseDetailsSchema = new Schema({
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema<TCourse, CourseModel>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [
    {
      name: {
        type: String,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        required: true,
      },
    },
  ],
  startDate: Date,
  endDate: Date,
  language: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  durationInWeeks: {
    type: Number,
    required: false,
  },
  details: courseDetailsSchema,
});

courseSchema.pre("save", async function () {
  // checking if the categoryId is valid or not.
  const category = await Category.findById(this?.categoryId);
  if (!category) {
    throw new Error("The category doesn't exist");
  }
  // checking if the course endDate isn't earlier than the startDate or not.
  const differenceInCourseDuration =
    this?.endDate?.getTime() - this?.startDate?.getTime();
  if (differenceInCourseDuration < 0) {
    throw new Error(
      "Invalid course endDate.The course endDate cannot be earlier than the startDate."
    );
  }
});

courseSchema.statics.isCourseExists = async (title: string) => {
  const course = await Course.findOne({ title: title });
  return course;
};
courseSchema.statics.findCourse = async (id: string) => {
  const course = await Course.findById(id);
  return course;
};

export const Course = model<TCourse, CourseModel>("course", courseSchema);
