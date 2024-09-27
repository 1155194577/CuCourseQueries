import { getLessonsArrayByProgramName } from "./parseAndCleanData";
import { addDoc } from "../firebase/documentOperation";
import { programmeNames } from "../../constant/programme";
import { dbName } from "../../constant/db";
// Parse Local Data and Push to Database

for (const programName of programmeNames) {
  let courseAddedCount: number = 0;
  getLessonsArrayByProgramName(programName).then((lessonsArray) => {
    for (const lesson of lessonsArray) {
      const lessonId = Object.keys(lesson)[0];
      console.log(lessonId, "->", lesson[lessonId]);
      addDoc(dbName.default, "lessons", lessonId, lesson[lessonId]).then(
        (res: boolean) => {
          // console.log("res", res);
          courseAddedCount++;
          console.log("courseAddedCount", courseAddedCount);
        }
      );
    }
  });
}
