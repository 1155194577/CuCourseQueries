import {
  Class,
  ClassesSchema,
  ClassSchema,
  CourseSchema,
  TermsSchema,
} from "../../types/courses";
import { Course } from "../../types/courses";
import { addDoc, getDoc } from "../firebase/documentOperation";
// program Code => CourseData.
//CourseData + TermName => lessonNumbers
//lessonNumber => lessonData

export async function getCourseDataByProgramCode(
  programName: string,
  courseCode: string
): Promise<Course> {
  //e.g given AIST , 2010 => return course data
  try {
    const courseData: any = await getDoc(programName, courseCode);
    const isSuccessful = CourseSchema.safeParse(courseData).success;
    if (!isSuccessful) {
      throw new Error("Invalid course data");
    }
    return courseData;
  } catch (error) {
    throw error;
  }
}
export async function getClassesNumbersByTermId(
  courseData: Course,
  termName: string
): Promise<string[]> {
  // given course data and term name, return class numbers available in that term
  try {
    const semestersCourseData = courseData?.terms;
    if (!semestersCourseData) {
      throw new Error("Invalid course data");
    }
    const semesterCourseData = semestersCourseData[termName];
    if (!semesterCourseData) {
      throw new Error("Invalid term name");
    }
    const classNumbers = Object.keys(semesterCourseData);
    return classNumbers;
  } catch (error) {
    return [];
  }
}

export async function getClassDataByClassNumber(
  programName: string,
  courseCode: string,
  termName: string,
  classNumber: string
): Promise<Class | undefined> {
  try {
    const courseData: Course = await getCourseDataByProgramCode(
      programName,
      courseCode
    );
    CourseSchema.parse(courseData);
    const termsData: any = courseData.terms;
    TermsSchema.parse(termsData);
    // console.log(termsData[termName]);
    ClassesSchema.parse(termsData[termName]);
    // const classNumber: string = "-L01-LAB (8746)";
    // console.log(termsData[termName][classNumber]);
    ClassSchema.parse(termsData[termName][classNumber]);
    return termsData[termName][classNumber];
  } catch (error) {
    console.log("Error:", error);
  }
}

// getDoc("aist", "1000").then((data) => {
//   // print(data);
//   // console.log(data);
// });
