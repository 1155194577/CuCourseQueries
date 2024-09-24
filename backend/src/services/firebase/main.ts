import { get } from "http";
import {
  Class,
  ClassesSchema,
  ClassSchema,
  CourseSchema,
  TermsSchema,
} from "../../types/courses";
import { Course } from "../../types/courses";
import { addDoc, getDoc } from "./documentOperation";

async function getCourseDataByProgramCode(
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
async function getClassesNumbersByTermId(
  courseData: Course,
  termName: string
): Promise<string[]> {
  // given course data and term name, return class numbers available in that term
  const semestersCourseData = courseData.terms;
  const semesterCourseData = semestersCourseData[termName];
  const classNumbers = Object.keys(semesterCourseData);
  return classNumbers;
}

async function getClassDataByClassNumber(
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

async function main(programName: string, courseCode: string, termName: string) {
  const courseData: Course = await getCourseDataByProgramCode(
    programName,
    courseCode
  );
  const classNumbers = await getClassesNumbersByTermId(courseData, termName);
  for (const classNumber of classNumbers) {
    const classData: Class | undefined = await getClassDataByClassNumber(
      programName,
      courseCode,
      termName,
      classNumber
    );
    const isValidClassData: boolean = ClassSchema.safeParse(classData).success;
    console.log(classNumber, "->", classData);
    if (isValidClassData && classData) {
      await addDoc("lectures", classNumber, classData);
    }
  }
}

main("aist", "1000", "2024-25 Term 1").catch(console.error);
