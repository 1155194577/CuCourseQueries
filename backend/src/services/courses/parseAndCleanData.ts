import {
  CoursesArrayType,
  CourseSchema,
  CourseType,
  CoursesArraySchema,
  LessonType,
  LessonMapSchema,
  TermMapSchema,
  TermMapType,
  LessonMapType,
  LessonArraySchema,
  LessonArrayType,
} from "../../types/courses";
import { asyncReadJsonFile } from "../../utils/fileIO";
import { z } from "zod";
const programmeNames: string[] = [
  "AIST",
  "CSCI",
  "ELEG",
  "ENGG",
  "IERG",
  "MATH",
  "RMSC",
  "SEEM",
];

export async function parseCourseData(
  localDir: string
): Promise<CoursesArrayType | []> {
  try {
    const rawCourseData: any = await asyncReadJsonFile<any>(localDir);
    const parsedCoursesArray: CoursesArrayType =
      CoursesArraySchema.parse(rawCourseData);
    return parsedCoursesArray;
  } catch (e) {
    return [];
  }
}

//goal is to convert the course data array to lesson array
async function convertCourseDataToLessons(
  // input : CourseData
  // output : the lessons map in a specific term (e.g 2024-25 Term 1)
  courseData: CourseType
): Promise<LessonMapType | {}> {
  const hasTermData: boolean = courseData.terms !== undefined;
  // console.log(hasTermData);
  if (hasTermData) {
    const termMap: TermMapType = TermMapSchema.parse(courseData.terms);
    const lessonMap: LessonMapType = termMap["2024-25 Term 1"];
    return lessonMap;
  } else {
    return {};
  }
}

export async function convertCourseArrayToLessonArray(
  courses: CoursesArrayType
): Promise<LessonArrayType | []> {
  const lessonArray: LessonArrayType = [];
  if (courses.length === 0) {
    return [];
  }
  for (const course of courses) {
    const lessonMap: LessonMapType = await convertCourseDataToLessons(course);
    // const courseIds: string[] = [];

    if (lessonMap) {
      const lessonMapKeys = Object.keys(lessonMap);
      const tempData: LessonMapType = {};
      for (const lessonMapKey of lessonMapKeys) {
        const lessonData: LessonType = lessonMap[lessonMapKey];
        tempData[lessonMapKey] = lessonData;
        lessonArray.push(tempData);
      }
    }
  }
  if (LessonArraySchema.safeParse(lessonArray).success) {
    // console.log("Data is valid : ", lessonArray.length);
    return lessonArray;
  } else {
    return [];
  }
}

const getLessonsArrayFromJson = async (
  localDir: string
): Promise<LessonArrayType> => {
  const coursesArray: CoursesArrayType = await parseCourseData(localDir);
  const lessonArray: LessonArrayType = await convertCourseArrayToLessonArray(
    coursesArray
  );
  return lessonArray;
};

// for (const programmeName of programmeNames) {
//   getLessonsArrayFromJson(`../../data/courses/${programmeName}.json`);
// }
