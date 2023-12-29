import mongoose from "mongoose";
import { TMeta } from "../../interface/course.interface";
import { Review } from "../review/review.model";
import { TCourse, TCourseTags } from "./course.interface";
import { Course } from "./course.model";
import { getDurationWeeks, getSortOperator } from "./course.utils";

const createCourseIntoDB = async (payload: TCourse) => {
  if (await Course.isCourseExists(payload.title)) {
    throw new Error("The course already exists");
  }

  if (payload.durationInWeeks) {
    throw new Error("durationInWeeks can't be send with the body data");
  }

  let tags: TCourseTags;

  tags = payload.tags.filter((tag) => !tag.isDeleted) as TCourseTags;

  const { startDate, endDate } = payload;

  const courseDuration = getDurationWeeks(
    new Date(startDate),
    new Date(endDate)
  );

  const courseData: TCourse = {
    ...payload,
    tags: tags,
    durationInWeeks: courseDuration,
  };

  const result = await Course.create(courseData);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  // default query for getting courses.
  const defaultQuery = Course.find({}, { __v: 0 }).populate("categoryId");

  // page and limit query.
  let page = 1;
  let limit = 10;
  let skip = 0;

  if (query.limit) {
    limit = Number(query?.limit);
  }

  if (query.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }

  const skipQuery = defaultQuery.skip(skip);

  const limitQuery = skipQuery.limit(limit);

  // sort query.

  let sortBy = "";
  let sortOrder = "asc";

  const sortByFields = [
    "title",
    "price",
    "startDate",
    "endDate",
    "language",
    "durationInWeeks",
  ];

  // sortBy Query assigning
  if (query.sortBy) {
    if (!sortByFields.includes(query.sortBy as string)) {
      throw new Error(`${query.sortBy} can't be used as a value of sortBy`);
    }
    sortBy = query.sortBy as string;
  }
  // sortOrder Query assigning
  if (query.sortOrder) {
    sortOrder = query.sortOrder as string;
  }

  const sortingQuery = sortBy ? `${getSortOperator(sortOrder)}${sortBy}` : null;

  const sortByQuery = limitQuery.sort(sortingQuery);

  const filterQuery: Record<string, unknown> = {};

  let minPrice = 0;
  let maxPrice = Infinity;

  if (query.minPrice) {
    minPrice = Number(query.minPrice);
  }
  if (query.maxPrice) {
    maxPrice = Number(query.maxPrice);
  }

  filterQuery["price"] = { $gte: minPrice, $lte: maxPrice };

  if (query.tags) {
    filterQuery["tags"] = { $elemMatch: { name: query.tags } };
  }

  if (query.startDate) {
    filterQuery["startDate"] = { $lte: query.startDate };
  }

  if (query.endDate) {
    filterQuery["endDate"] = { $gte: query.endDate };
  }

  if (query.language) {
    filterQuery["language"] = query.language as string;
  }

  if (query.provider) {
    filterQuery["provider"] = query.provider as string;
  }

  if (query.durationInWeeks) {
    filterQuery["durationInWeeks"] = query.durationInWeeks as number;
  }

  if (query.level) {
    filterQuery["details.level"] = query.level as string;
  }

  const filteredQueryResult = sortByQuery.find(filterQuery);

  const result = await filteredQueryResult.find();

  const meta: TMeta = {
    page,
    limit,
    total: result.length,
  };

  return { result, meta };
};

const getSingleCourseFromDB = async (courseId: string) => {
  const result = await Course.findById(courseId, { __v: 0 }).populate(
    "categoryId"
  );
  if (!result) {
    throw new Error("The course doesn't exist");
  }
  return result;
};

const updateCourseToDB = async (id: string, payload: Partial<TCourse>) => {
  if (!(await Course.findById(id))) {
    throw new Error("The course doesn't exist");
  }

  if (payload.durationInWeeks) {
    throw new Error("durationInWeeks can't be updated");
  }

  const { tags, details, ...remainingCourseData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingCourseData };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  const tagsToAdd = tags?.filter((value) => !value.isDeleted);
  const tagsToRemove = tags
    ?.filter((value) => value.isDeleted)
    .map((tag) => tag.name);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // adding tags to the tags property of the course
    const addedTags = await Course.findByIdAndUpdate(
      id,
      { $addToSet: { tags: { $each: tagsToAdd ? tagsToAdd : [] } } },
      { new: true }
    );

    if (!addedTags) {
      throw new Error("Failed to update course");
    }

    // removing tags from the tags property of the course
    const removedTags = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { tags: { name: { $in: tagsToRemove ? tagsToRemove : [] } } },
      },
      { new: true }
    );

    if (!removedTags) {
      throw new Error("Failed to update course");
    }

    const result = await Course.findByIdAndUpdate(id, modifiedData, {
      new: true,
    });

    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new Error(error.message || "Failed to update course!!");
  }
};

const getCourseWithReviewsFromDB = async (courseId: string) => {
  if (!(await Course.findCourse(courseId))) {
    throw new Error("The Course doesn't exist");
  }

  const course = await Course.findById(courseId).populate("categoryId");
  let reviews: any;
  if (course) {
    reviews = await Review.find({ courseId });
  }
  const courseWithReviews = { course, reviews };
  return courseWithReviews;
};

const getBestCourseBasedOnReviewFromDB = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: "$courseId",
        reviewCount: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
    {
      $project: {
        _id: 0,
        courseId: "$_id",
        reviewCount: 1,
        averageRating: 1,
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $project: {
        course: { $arrayElemAt: ["$course", 0] },
        reviewCount: 1,
        averageRating: 1,
      },
    },
  ]);

  return result[0];
};

export const courseServices = {
  createCourseIntoDB,
  updateCourseToDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  getCourseWithReviewsFromDB,
  getBestCourseBasedOnReviewFromDB,
};
