import { Model, Types } from "mongoose";

export type TCourseTags = [
  {
    name: string;
    isDeleted: boolean;
  }
];

export type TCourseDetails = {
  level: string;
  description: string;
};

export interface TCourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TCourseTags;
  startDate: Date;
  endDate: Date;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TCourseDetails;
}

export interface CourseModel extends Model<TCourse> {
  isCourseExists(title: string): Promise<TCourse | null>;
  findCourse(id: string): Promise<TCourse | null>;
}
