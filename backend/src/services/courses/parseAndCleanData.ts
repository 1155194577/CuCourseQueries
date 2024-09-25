import {
  CoursesArrayType,
  CourseSchema,
  CourseType,
  CoursesArraySchema,
} from "../../types/courses";
import { readJsonFile } from "../../utils/fileIO";
import { z } from "zod";
const programmeNames: string[] = ["AIST", "CSCI", "ENGG"];

async function parseCourseData(localDir: string): Promise<void> {
  try {
    const rawCourseData: any = await readJsonFile(localDir);
    const parsedCoursesArray: CoursesArrayType =
      CoursesArraySchema.parse(rawCourseData);
    for (const parsedCourse of parsedCoursesArray) {
      console.log(JSON.stringify(parsedCourse, null, 2));
    }
  } catch (e) {
    console.log("error", JSON.stringify(e, null, 2));
  }
}

parseCourseData("../../data/courses/AIST.json").then(() => {
  console.log("done");
});
