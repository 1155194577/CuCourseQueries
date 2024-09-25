import {
  CoursesArrayType,
  CourseSchema,
  CourseType,
  CoursesArraySchema,
} from "../../types/courses";
import { asyncReadJsonFile } from "../../utils/fileIO";
import { z } from "zod";
const programmeNames: string[] = ["AIST", "CSCI", "ENGG"];

async function parseCourseData(localDir: string): Promise<CoursesArrayType> {
  try {
    const rawCourseData: any = await asyncReadJsonFile<any>(localDir);
    const parsedCoursesArray: CoursesArrayType =
      CoursesArraySchema.parse(rawCourseData);
    return parsedCoursesArray;
  } catch (e) {
    return [];
  }
}

parseCourseData("../../data/courses/AIST.jso").then(
  (courses: CoursesArrayType) => {
    console.log("done", courses);
  }
);
