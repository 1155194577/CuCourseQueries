import { parseCourseData } from "./parseAndCleanData";
import { paths } from "../../constant/paths";
import { programmeNames } from "../../constant/programme";
import { addDoc } from "../firebase/documentOperation";
import { dbName } from "../../constant/db";
import { CoursesArrayType } from "../../types/courses";
for (const programmeName of programmeNames) {
  parseCourseData(`${paths.coursesFolder}/${programmeName}.json`).then(
    (CourseArray: CoursesArrayType) => {
      for (const course of CourseArray) {
        const courseCode: string = course.code;
        addDoc(dbName.courseData, programmeName, courseCode, course).then(
          (res: boolean) => {
            console.log("success", res);
          }
        );
      }
      //   addDoc(dbName.courseData,programmeName,).then();
    }
  );
}
