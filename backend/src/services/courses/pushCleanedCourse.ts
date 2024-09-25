import { getLessonsArrayByProgramName } from "./parseAndCleanData";
import { addDoc } from "../firebase/documentOperation";
// Parse Local Data and Push to Database
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

for (const programName of programmeNames) {
  getLessonsArrayByProgramName(programName).then((lessonsArray) => {
    for (const lesson of lessonsArray) {
      const lessonId = Object.keys(lesson)[0];
      addDoc(programName, lessonId, lesson[lessonId]);
    }
  });
}
