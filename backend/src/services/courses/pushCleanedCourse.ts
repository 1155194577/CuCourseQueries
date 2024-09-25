import {
  getCourseDataByProgramCode,
  getClassesNumbersByTermId,
  getClassDataByClassNumber,
} from "./getCourse";
import { addDoc } from "../firebase/documentOperation";
import { Course, Class, ClassSchema, CourseSchema } from "../../types/courses";
async function main(programName: string, courseCode: string, termName: string) {
  const courseData: Course = await getCourseDataByProgramCode(
    programName,
    courseCode
  );
  console.log("a", courseData);
  console.log(
    programName,
    courseCode,
    CourseSchema.safeParse(courseData).success
  );
  const classNumbers = await getClassesNumbersByTermId(courseData, termName);
  console.log(programName, courseCode, classNumbers);
  for (const classNumber of classNumbers) {
    const classData: Class | undefined = await getClassDataByClassNumber(
      programName,
      courseCode,
      termName,
      classNumber
    );
    if (classData) {
      ClassSchema.parse(classData);
    }
    // const isValidClassData: boolean = ClassSchema.safeParse(classData).success;
    if (true && classData) {
      await addDoc(
        "lectures",
        programName + courseCode + classNumber,
        classData
      );
    }
  }
}
const codes: string[] = [
  "1000",
  "1110",
  "2010",
  "2601",
  "2602",
  "3010",
  "3020",
  "3030",
  "3110",
  "3120",
  "3510",
  "4010",
];
for (const code of codes) {
  main("aist", code, "2024-25 Term 1").catch(console.error);
  main("aist", code, "2024-25 Term 2").catch(console.error);
}
