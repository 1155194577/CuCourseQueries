import {
  CoursesArrayType,
  CourseType,
  CoursesArraySchema,
  LessonType,
  TermMapSchema,
  TermMapType,
  LessonMapType,
  LessonArraySchema,
  LessonArrayType,
} from "../../types/courses";
import { asyncReadJsonFile } from "../../utils/fileIO";
import { paths } from "../../constant/paths";

async function parseCourseData(
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
async function convertCourseDataToLessonsAndCode(
  // input : CourseData
  // output : the lessons map in a specific term (e.g 2024-25 Term 1) and course Code
  courseData: CourseType
): Promise<[LessonMapType | {}, string | ""]> {
  const hasTermData: boolean = courseData.terms !== undefined;
  // console.log(hasTermData);
  if (hasTermData) {
    const termMap: TermMapType = TermMapSchema.parse(courseData.terms);
    const lessonMap: LessonMapType = termMap["2024-25 Term 1"];
    // console.log(lessonMap);
    return [lessonMap, courseData.code];
  } else {
    return [{}, ""];
  }
}

async function convertCourseArrayToLessonArray(
  programName: string,
  courses: CoursesArrayType
): Promise<LessonArrayType | []> {
  const lessonArray: LessonArrayType = [];
  if (courses.length === 0) {
    return [];
  }
  for (const course of courses) {
    const [lessonMap, courseCode]: [LessonMapType, string] =
      await convertCourseDataToLessonsAndCode(course); // destructuring
    if (courseCode === "" || !lessonMap) {
      continue;
    } else {
      // console.log("bb", Object.keys(lessonMap).length, courseCode === "");
      const lessonMapKeys: string[] = Object.keys(lessonMap);
      for (const lessonMapKey of lessonMapKeys) {
        const lessonData: LessonType = lessonMap[lessonMapKey];
        lessonData["courseCode"] = programName + courseCode;
        lessonArray.push({ [lessonMapKey]: lessonData });
      }
    }
  }
  if (LessonArraySchema.safeParse(lessonArray).success) {
    console.log("Data is valid : ", lessonArray.length);
    return lessonArray;
  } else {
    return [];
  }
}

export const getLessonsArrayByProgramName = async (
  programName: string
): Promise<LessonArrayType> => {
  const localDir: string = `${paths.coursesFolder}/${programName}.json`;
  const coursesArray: CoursesArrayType = await parseCourseData(localDir);
  const lessonArray: LessonArrayType = await convertCourseArrayToLessonArray(
    programName,
    coursesArray
  );
  return lessonArray;
};

for (const programName of [
  "AIST",
  "CSCI",
  "ELEG",
  "ENGG",
  "IERG",
  "MATH",
  "RMSC",
  "SEEM",
]) {
  getLessonsArrayByProgramName(programName).then((lessonsArray) => {
    console.log(lessonsArray.length);
  });
}
