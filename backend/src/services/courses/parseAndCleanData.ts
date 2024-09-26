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
import { parse } from "path";
export async function parseCourseData(
  localDir: string
): Promise<CoursesArrayType | []> {
  try {
    const rawCourseData: any = await asyncReadJsonFile<any>(localDir);
    const parsedCoursesArray: CoursesArrayType =
      CoursesArraySchema.parse(rawCourseData);
    // console.log(parsedCoursesArray.length);
    return parsedCoursesArray;
  } catch (e: any) {
    // console.log(e.message);
    return [];
  }
}
//expected input :
// [ '14:30', '14:30' ] [ '16:15', '15:15' ]
// [ '15:30' ] [ '16:15' ]
// [ '14:30', '14:30' ] [ '16:15', '15:15' ]
// [ '15:30' ] [ '16:15' ]
// [ 'TBA' ] [ 'TBA' ]
function dayStringToNumber(days: (number | string)[] | undefined): number[] {
  const ans: number[] = [];
  if (!days) {
    return ans;
  }
  for (const i in days) {
    if (days[i] === "TBA") {
      ans.push(-1);
    } else {
      if (typeof days[i] === "number") {
        ans.push(days[i]);
      }
    }
  }
  return ans;
}

function timeStringToMinutes(time: string): number {
  // Time elpased since 00:00
  if (time === "TBA") {
    return 0;
  }
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60;
}

async function convertCourseDataToLessonsAndCode(
  // input : CourseData
  // output : the lessons map in a specific term (e.g 2024-25 Term 1) and course Code
  courseData: CourseType
): Promise<[LessonMapType | {}, string | ""]> {
  const hasTermData: boolean = courseData.terms !== undefined;
  if (hasTermData) {
    const termMap: TermMapType = TermMapSchema.parse(courseData.terms);
    const lessonMap: LessonMapType = termMap["2024-25 Term 1"]; // TODO : change this to dynamic
    return [lessonMap, courseData.code];
  } else {
    return [{}, ""];
  }
}

const convertToNumbers = (arr: (string | number)[]): number[] => {
  const newArr: number[] = arr.map((val) => {
    return typeof val === "string" ? timeStringToMinutes(val) : val;
  });
  return newArr;
};
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
      // console.log("bb", Object.keys(lessonMap), courseCode === "");
      const lessonMapKeys: string[] = Object.keys(lessonMap);
      for (const lessonMapKey of lessonMapKeys) {
        const lessonData: LessonType = lessonMap[lessonMapKey];
        lessonData["days"] = dayStringToNumber(lessonData["days"]);
        // convert days to numbers
        lessonData["startTimes"] = convertToNumbers(lessonData["startTimes"]);
        lessonData["endTimes"] = convertToNumbers(lessonData["endTimes"]);
        lessonData["courseCode"] = programName + courseCode;
        lessonArray.push({ [lessonMapKey]: lessonData });
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

// usage;
// for (const programName of ["ENGG", "SEEM"]) {
//   getLessonsArrayByProgramName(programName).then((lessonsArray) => {
//     for (const lesson of lessonsArray) {
//       const lessonId = Object.keys(lesson)[0];
//     }
//   });
// }
