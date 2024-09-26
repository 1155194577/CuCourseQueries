import { getLessonsArrayByProgramName } from "./parseAndCleanData";
import { addDoc } from "../firebase/documentOperation";
import { programmeNames } from "../../constant/programme";
import { dbName } from "../../constant/db";
// Parse Local Data and Push to Database

for (const programName of programmeNames) {
  getLessonsArrayByProgramName(programName).then((lessonsArray) => {
    for (const lesson of lessonsArray) {
      const lessonId = Object.keys(lesson)[0];
      addDoc(dbName.courseData, "t", "d", { Test: "val" }).then(
        (res: boolean) => {
          console.log("res", res);
        }
      );
    }
  });
}
